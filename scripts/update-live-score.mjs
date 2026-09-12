import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';

const config = {
  eventSlug: process.env.SNOOKER_EVENT_SLUG || 'english-open-2026',
  eventName: process.env.SNOOKER_EVENT_NAME || 'English Open',
  source: process.env.SNOOKER_SOURCE_URL || 'https://www.snooker.org/res/index.asp?event=2546',
  sourceLabel: process.env.SNOOKER_SOURCE_LABEL || 'Snooker.org · BetVictor English Open',
  activeFrom: process.env.SNOOKER_ACTIVE_FROM || '2026-09-07T00:00:00Z',
  activeUntil: process.env.SNOOKER_ACTIVE_UNTIL || '2026-09-14T00:00:00Z',
  output: process.env.LIVE_SCORE_OUTPUT || '/srv/snookercalendar/current/data/live-score.json',
};

const entities = new Map([['&nbsp;',' '],['&amp;','&'],['&quot;','"'],['&#39;',"'"],['&pound;','£'],['&ndash;','–'],['&mdash;','—']]);
const decode = (value) => value.replace(/&(?:nbsp|amp|quot|#39|pound|ndash|mdash);/g, match => entities.get(match) || match);
const text = (value) => decode(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function playerName(cell) {
  const links = [...cell.matchAll(/<a\b[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  if (!links.length) return text(cell).replace(/\s*\[[^\]]+\]\s*$/, '');
  return links.map(([, title, label]) => {
    const visible = text(label);
    return /^[A-Z]\s/.test(visible) ? decode(title).split(',')[0] : visible;
  }).join(' / ');
}

function roundBlock(html, sourceName) {
  const marker = new RegExp(`<span class="round">${sourceName}<\\/span>`, 'i');
  const match = marker.exec(html);
  if (!match) return '';
  const headerEnd = html.indexOf('</thead>', match.index);
  const nextHeader = html.indexOf('<thead', headerEnd + 8);
  return html.slice(headerEnd + 8, nextHeader === -1 ? html.length : nextHeader);
}

function parseRound(html, sourceName, label, winningScore) {
  const block = roundBlock(html, sourceName);
  const rows = [...block.matchAll(/<tr class="[^"]*\boneonone\b[^"]*"[\s\S]*?<\/tr>/gi)].map(match => match[0]);
  return rows.flatMap(row => {
    const playerCells = [...row.matchAll(/<td class="player\s*"[^>]*>([\s\S]*?)<\/td>/gi)].map(match => match[1]);
    if (playerCells.length < 2) return [];
    const first = row.match(/class="[^"]*\bfirst-score\b[^"]*"[^>]*>([\s\S]*?)<\/td>/i);
    const last = row.match(/class="[^"]*\blast-score\b[^"]*"[^>]*>([\s\S]*?)<\/td>/i);
    const firstScore = first ? Number.parseInt(text(first[1]), 10) : Number.NaN;
    const lastScore = last ? Number.parseInt(text(last[1]), 10) : Number.NaN;
    const times = [...row.matchAll(/<span class="(?:scheduled|session)"[^>]*>([^<]+)<\/span>/gi)].map(match => text(match[1]));
    const item = {
      round: label,
      playerOne: playerName(playerCells[0]),
      playerTwo: playerName(playerCells[1]),
      firstScore,
      lastScore,
      sortAt: times[0] || '',
      timing: times.map(value => new Date(value).toLocaleString('en-GB', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'UTC',hour12:false})).join(' & ') + (times.length ? ' UTC' : ''),
    };
    item.complete = Number.isFinite(firstScore) && Number.isFinite(lastScore) && Math.max(firstScore, lastScore) >= winningScore;
    item.started = Number.isFinite(firstScore) && Number.isFinite(lastScore) && !item.complete;
    return [item];
  });
}

function checkedLabel(date) {
  return new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'UTC',hour12:false}).format(date).replace(',', ' ·') + ' UTC';
}

const now = new Date();
if (process.env.FORCE_LIVE_SCORE_UPDATE !== '1' && (now < new Date(config.activeFrom) || now >= new Date(config.activeUntil))) {
  console.log(`No active event fetch: ${config.eventSlug}`);
  process.exit(0);
}

const response = await fetch(config.source, {headers: {'user-agent': 'TheSnookerCalendar/0.1 (+https://snookercalendar.com/contact/)'}});
if (!response.ok) throw new Error(`Source returned HTTP ${response.status}`);
const html = await response.text();
if (!html.includes('English Open') || html.length < 50_000) throw new Error('Source validation failed; previous snapshot retained');

const parsed = [
  ...parseRound(html, 'Final', 'Final', 9),
  ...parseRound(html, 'Semifinals', 'Semi-final', 6),
  ...parseRound(html, 'Quarterfinals', 'Quarter-final', 6),
];
const verifiedResults = parsed.filter(item => item.complete).map(({round,playerOne,playerTwo,firstScore,lastScore}) => ({round,playerOne,score:`${firstScore}–${lastScore}`,playerTwo}));
const liveMatches = parsed.filter(item => item.started).map(({round,playerOne,playerTwo,firstScore,lastScore}) => ({round,playerOne,score:`${firstScore}–${lastScore}`,playerTwo}));
const upcoming = parsed.filter(item => !item.complete && !item.started && item.timing).sort((a,b) => a.sortAt.localeCompare(b.sortAt)).map(({round,playerOne,playerTwo,timing}) => ({round,playerOne,playerTwo,timing}));
if (!verifiedResults.length) throw new Error('No completed matches parsed; previous snapshot retained');

let status = 'Latest scores';
if (liveMatches.length) status = 'Match in progress';
else if (verifiedResults.some(item => item.round === 'Final')) status = 'Tournament complete';
else if (verifiedResults.filter(item => item.round === 'Semi-final').length === 2) status = 'Final confirmed';
else if (verifiedResults.some(item => item.round === 'Semi-final')) status = 'Semi-finals';

const data = {
  eventSlug: config.eventSlug,
  eventName: config.eventName,
  checked: checkedLabel(now),
  source: config.source,
  sourceLabel: config.sourceLabel,
  status,
  summary: 'Scores are checked against the linked source. In-play figures may trail the table by up to 15 minutes.',
  verifiedResults,
  liveMatches,
  upcoming,
};

await mkdir(dirname(config.output), {recursive: true});
const temporary = `${config.output}.next`;
await writeFile(temporary, JSON.stringify(data, null, 2) + '\n');
await rename(temporary, config.output);

try {
  const saved = JSON.parse(await readFile(config.output, 'utf8'));
  console.log(`Updated ${saved.eventName}: ${saved.verifiedResults.length} results, ${saved.liveMatches.length} live, ${saved.upcoming.length} upcoming`);
} catch {
  throw new Error('Updated file could not be verified');
}
