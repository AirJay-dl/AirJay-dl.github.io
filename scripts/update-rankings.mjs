import {mkdir,rename,writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';

const source=process.env.RANKINGS_SOURCE_URL||'https://rankings.snooker.web.gc.wstservices.co.uk/v2';
const output=process.env.RANKINGS_OUTPUT||'/srv/snookercalendar/current/data/rankings.json';
const countries={AUS:'Australia',BEL:'Belgium',CHN:'China',ENG:'England',IRL:'Ireland',IRN:'Iran',NIR:'Northern Ireland',SCT:'Scotland',THA:'Thailand',WAL:'Wales'};
const checked=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'UTC',hour12:false}).format(new Date()).replace(',',' ·')+' UTC';

const response=await fetch(source,{headers:{'user-agent':'TheSnookerCalendar/0.1 (+https://snookercalendar.com/contact/)'}});
if(!response.ok)throw new Error(`Ranking source returned HTTP ${response.status}`);
const payload=await response.json();
const lists=payload.data?.filter(item=>item.attributes?.name==='World Rankings')||[];
const convert=item=>({
 label:item.attributes.recalculateAfter,
 positions:item.attributes.positions.slice(0,50).map(entry=>({
  rank:entry.position,
  name:[entry.player.firstName,entry.player.middleName,entry.player.surname].filter(Boolean).join(' '),
  slug:entry.player.playerSlug,
  country:countries[entry.player.country]||entry.player.country,
  money:entry.prizeMoney,
 })),
});
const official=lists.find(item=>item.attributes.live===false);
const live=lists.find(item=>item.attributes.live===true);
if(!official||!live)throw new Error('Official or live world ranking list is missing');
const snapshot={checked,source:'https://www.wst.tv/rankings/?showLive=false',sourceApi:source,official:convert(official),live:convert(live)};
for(const list of [snapshot.official,snapshot.live]){
 if(list.positions.length!==50)throw new Error(`${list.label} does not contain 50 positions`);
 if(new Set(list.positions.map(item=>item.rank)).size!==50)throw new Error(`${list.label} contains duplicate positions`);
}
await mkdir(dirname(output),{recursive:true});
const temporary=`${output}.next`;
await writeFile(temporary,JSON.stringify(snapshot,null,2)+'\n');
await rename(temporary,output);
console.log(`Updated rankings: ${snapshot.official.label}; ${snapshot.live.label}`);
