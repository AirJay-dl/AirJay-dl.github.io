import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import {recordTournamentSnapshot} from './database.mjs';

const config = {
  calendar: process.env.SNOOKER_CALENDAR_URL || 'https://www.snooker.org/res/index.asp?season=2026&template=2',
  output: process.env.LIVE_SCORE_OUTPUT || '/srv/snookercalendar/current/data/live-score.json',
};
const headers = {'user-agent': 'TheSnookerCalendar/0.1 (+https://snookercalendar.com/contact/)'};
const entities = new Map([['&nbsp;',' '],['&amp;','&'],['&quot;','"'],['&#39;',"'"],['&pound;','£'],['&ndash;','–'],['&mdash;','—'],['&#8209;','-'],['&uuml;','ü'],['&szlig;','ß']]);
const decode = (value) => value.replace(/&(?:nbsp|amp|quot|#39|pound|ndash|mdash|#8209|uuml|szlig);/g, match => entities.get(match) || match);
const text = (value) => decode(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

async function fetchPage(url) {
  const response = await fetch(url, {headers});
  if (!response.ok) throw new Error(`Source returned HTTP ${response.status}: ${url}`);
  return response.text();
}

function slugify(name, year) {
  return `${name.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${year}`;
}

function calendarEvents(html) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].flatMap(([, row]) => {
    const cells = [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(match => match[1]);
    const eventLink = row.match(/href="\/res\/index\.asp\?event=(\d+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!eventLink || cells.length < 7) return [];
    const start = text(cells[2]).replaceAll('.', '-');
    const end = text(cells[3]).replaceAll('.', '-');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) return [];
    const name = text(eventLink[2]);
    return [{id:eventLink[1], name, start, end, type:text(cells[6]), slug:slugify(name,start.slice(0,4)), source:`https://www.snooker.org/res/index.asp?event=${eventLink[1]}`}];
  });
}

function selectEvent(events, now) {
  const day = now.toISOString().slice(0, 10);
  const active = events.filter(event => event.start <= day && event.end >= day);
  if (active.length) {
    const priority = event => /ranking/i.test(event.type) ? 3 : /invitational/i.test(event.type) ? 2 : /qual/i.test(event.type) ? 1 : 0;
    return active.sort((a,b) => priority(b)-priority(a) || b.start.localeCompare(a.start))[0];
  }
  return events.filter(event => event.start > day).sort((a,b) => a.start.localeCompare(b.start))[0];
}

function playerName(cell) {
  const links = [...cell.matchAll(/<a\b[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  if (!links.length) return text(cell).replace(/\s*\[[^\]]+\]\s*$/, '');
  return links.map(([,title,label]) => { const visible=text(label); return /^[A-Z]\s/.test(visible)?decode(title).split(',')[0]:visible; }).join(' / ');
}
function roundLabel(name) {
  if (/^semifinals?$/i.test(name)) return 'Semi-final';
  if (/^quarterfinals?$/i.test(name)) return 'Quarter-final';
  return name.replace(/^Qual Round/i, 'Qualifying round');
}
function parseEvent(html) {
  const roundHeaders=[...html.matchAll(/<thead\b[^>]*>[\s\S]*?<span class="round">([^<]+)<\/span>([\s\S]*?)<\/thead>/gi)];
  return roundHeaders.flatMap((header,index) => {
    const sourceName=text(header[1]);
    const bestOf=Number.parseInt(header[2].match(/Best of\s*(\d+)/i)?.[1]||'7',10);
    const winningScore=Math.floor(bestOf/2)+1;
    const start=(header.index||0)+header[0].length;
    const end=index+1<roundHeaders.length?roundHeaders[index+1].index:html.length;
    const rows=[...html.slice(start,end).matchAll(/<tr class="[^"]*\boneonone\b[^"]*"[\s\S]*?<\/tr>/gi)].map(match=>match[0]);
    return rows.flatMap(row => {
      const playerCells=[...row.matchAll(/<td class="player\s*"[^>]*>([\s\S]*?)<\/td>/gi)].map(match=>match[1]);
      if(playerCells.length<2) return [];
      const first=row.match(/class="[^"]*\bfirst-score\b[^"]*"[^>]*>([\s\S]*?)<\/td>/i);
      const last=row.match(/class="[^"]*\blast-score\b[^"]*"[^>]*>([\s\S]*?)<\/td>/i);
      const walkover=/class="score\s*"[^>]*>\s*w\/o\s*<\/td>/i.test(row);
      const firstScore=first?Number.parseInt(text(first[1]),10):Number.NaN;
      const lastScore=last?Number.parseInt(text(last[1]),10):Number.NaN;
      const times=[...row.matchAll(/<span class="(?:scheduled|session)"[^>]*>([^<]+)<\/span>/gi)].map(match=>text(match[1]));
      const complete=walkover||(Number.isFinite(firstScore)&&Number.isFinite(lastScore)&&Math.max(firstScore,lastScore)>=winningScore);
      const started=!complete&&Number.isFinite(firstScore)&&Number.isFinite(lastScore);
      return [{round:roundLabel(sourceName),playerOne:playerName(playerCells[0]),playerTwo:playerName(playerCells[1]),score:walkover?'w/o':Number.isFinite(firstScore)&&Number.isFinite(lastScore)?`${firstScore}–${lastScore}`:'',complete,started,sortAt:times[0]||'',timing:times.map(value=>new Date(value).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'UTC',hour12:false})).join(' & ')+(times.length?' UTC':'')}];
    });
  });
}
function checkedLabel(date) { return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'UTC',hour12:false}).format(date).replace(',',' ·')+' UTC'; }

const now=new Date();
const event=selectEvent(calendarEvents(await fetchPage(config.calendar)),now);
if(!event) throw new Error('No active or upcoming event found; previous snapshot retained');
const html=await fetchPage(event.source);
if(!html.includes(event.name)||html.length<40_000) throw new Error('Event source validation failed; previous snapshot retained');
const parsed=parseEvent(html);
if(!parsed.length) throw new Error('No event matches parsed; previous snapshot retained');
const verifiedResults=parsed.filter(item=>item.complete).slice(0,24).map(({round,playerOne,score,playerTwo})=>({round,playerOne,score,playerTwo}));
const liveMatches=parsed.filter(item=>item.started).slice(0,12).map(({round,playerOne,score,playerTwo})=>({round,playerOne,score,playerTwo}));
const upcoming=parsed.filter(item=>!item.complete&&!item.started&&item.timing).sort((a,b)=>a.sortAt.localeCompare(b.sortAt)).slice(0,12).map(({round,playerOne,playerTwo,timing})=>({round,playerOne,playerTwo,timing}));
const day=now.toISOString().slice(0,10);
const isUpcoming=event.start>day;
let status=isUpcoming?'Coming up':/qual/i.test(event.type)?'Qualifying in progress':'Latest scores';
if(liveMatches.length) status='Match in progress';
else if(/^Final$/i.test(verifiedResults[0]?.round||'')) status='Tournament complete';
else if(!upcoming.length&&event.end<=day) status='Tournament complete';
const summary=isUpcoming?`The next scheduled event begins ${event.start}. Match times are shown when confirmed by the source.`:'Scores are checked against the linked source. In-play figures may trail the table by up to 15 minutes.';
const data={eventSlug:event.slug,eventName:event.name,checked:checkedLabel(now),source:event.source,sourceLabel:`Snooker.org · ${event.name}`,status,summary,verifiedResults,liveMatches,upcoming};
await recordTournamentSnapshot({event,data,matches:parsed,databasePath:process.env.SNOOKER_DB_PATH});
await mkdir(dirname(config.output),{recursive:true});
const temporary=`${config.output}.next`;
await writeFile(temporary,JSON.stringify(data,null,2)+'\n');
await rename(temporary,config.output);
const saved=JSON.parse(await readFile(config.output,'utf8'));
console.log(`Updated ${saved.eventName}: ${saved.verifiedResults.length} results, ${saved.liveMatches.length} live, ${saved.upcoming.length} upcoming`);
