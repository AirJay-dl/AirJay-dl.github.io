import {mkdir,readFile,rename,writeFile} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {recordRankingSnapshot,readPlayerCatalog} from './database.mjs';

const source=process.env.RANKINGS_SOURCE_URL||'https://rankings.snooker.web.gc.wstservices.co.uk/v2';
const output=process.env.RANKINGS_OUTPUT||'/srv/snookercalendar/shared/data/rankings.json';
const playerOutput=process.env.PLAYERS_OUTPUT||join(dirname(output),'players.json');
const countries={AUS:'Australia',AUT:'Austria',BEL:'Belgium',BRA:'Brazil',CAN:'Canada',CHN:'China',CYP:'Cyprus',EGY:'Egypt',ENG:'England',EST:'Estonia',FIN:'Finland',FRA:'France',GER:'Germany',HKG:'Hong Kong',IND:'India',IRL:'Ireland',IRN:'Iran',ISR:'Israel',LVA:'Latvia',MLT:'Malta',MYS:'Malaysia',NIR:'Northern Ireland',NOR:'Norway',NZL:'New Zealand',PAK:'Pakistan',POL:'Poland',SCT:'Scotland',SGP:'Singapore',SUI:'Switzerland',THA:'Thailand',UKR:'Ukraine',WAL:'Wales'};
export function convertList(item){
 return {label:item.attributes.recalculateAfter,positions:item.attributes.positions.slice().sort((a,b)=>a.position-b.position).slice(0,100).map(entry=>({rank:entry.position,name:[entry.player.firstName,entry.player.middleName,entry.player.surname].filter(Boolean).join(' '),slug:entry.player.playerSlug,country:countries[entry.player.country]||entry.player.country,money:entry.prizeMoney,sourceId:entry.player.playerID||entry.playerID,born:entry.player.dob||null,turnedPro:entry.player.turnedPro||null,source:`https://www.wst.tv/players/${entry.player.playerID||entry.playerID}`}))};
}
export function validateList(list){
 if(list.positions.length!==100)throw new Error(`${list.label}: expected 100 positions`);
 if(new Set(list.positions.map(p=>p.slug)).size!==100||new Set(list.positions.map(p=>p.sourceId)).size!==100)throw new Error('Duplicate player identity');
 list.positions.forEach((p,i)=>{if(p.rank!==i+1||!p.name||!/^[-a-z0-9]+$/.test(p.slug)||!p.sourceId||!Number.isFinite(p.money)||p.money<0)throw new Error('Invalid ranking row');});
}
export async function updateRankings(){
 const response=await fetch(source,{signal:AbortSignal.timeout(30000),headers:{'user-agent':'TheSnookerCalendar/0.2 (+https://snookercalendar.com/contact/)'}});
 if(!response.ok)throw new Error(`Ranking source returned HTTP ${response.status}`);
 const payload=await response.json();
 const lists=payload.data?.filter(item=>item.attributes?.name==='World Rankings')||[];
 const official=lists.find(item=>item.attributes.live===false),live=lists.find(item=>item.attributes.live===true);
 if(!official||!live)throw new Error('Official or live ranking list missing');
 const checkedAt=new Date().toISOString();
 const snapshot={checked:checkedAt,source:'https://www.wst.tv/rankings/?showLive=false',sourceApi:source,official:convertList(official),live:convertList(live)};
 validateList(snapshot.official);validateList(snapshot.live);
 let previous={players:[]};
 try{previous=JSON.parse(await readFile(playerOutput,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
 const catalog=new Map(previous.players.map(p=>[p.slug,{...p,rank:null,liveRank:null}]));
 for(const [type,list] of [['live',snapshot.live],['official',snapshot.official]])for(const row of list.positions){
  const old=catalog.get(row.slug)||{};
  catalog.set(row.slug,{...old,slug:row.slug,name:row.name,country:row.country,born:row.born||old.born||null,turnedPro:row.turnedPro||old.turnedPro||null,source:row.source,sourceId:row.sourceId,firstSeen:old.firstSeen||checkedAt,lastSeen:checkedAt,rank:type==='official'?row.rank:old.rank||null,liveRank:type==='live'?row.rank:old.liveRank||null,rankingMoney:type==='official'?row.money:old.rankingMoney??row.money});
 }
 let playerData={checkedAt,rankingLabel:snapshot.official.label,players:[...catalog.values()]};
 // With a configured DB, fail closed: publication and durable storage must agree.
 if(process.env.SNOOKER_DB_PATH){
  await recordRankingSnapshot({snapshot,databasePath:process.env.SNOOKER_DB_PATH});
  playerData={...playerData,players:await readPlayerCatalog(process.env.SNOOKER_DB_PATH)};
 }
 for(const [path,data] of [[playerOutput,playerData],[output,snapshot]]){
  await mkdir(dirname(path),{recursive:true});await writeFile(`${path}.next`,JSON.stringify(data,null,2)+'\n');await rename(`${path}.next`,path);
 }
 console.log(`Updated two Top 100 lists; retained ${playerData.players.length} player records`);
}
if(import.meta.url===new URL(process.argv[1],'file:').href)await updateRankings();
