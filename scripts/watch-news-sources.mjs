import {mkdir,readFile,rename,writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import {openDatabase} from './database.mjs';

const output=process.env.NEWS_WATCH_OUTPUT||'/srv/snookercalendar/shared/data/news.json';
const sources=[{name:'WPBSA',url:'https://www.wpbsa.com/feed/',kind:'rss'},{name:'WST',url:'https://www.wst.tv/news/',kind:'html'}];
const decode=s=>s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&#(x[0-9a-f]+|\d+);/gi,(_,n)=>String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n))).replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&apos;',"'").replaceAll('&nbsp;',' ');
const plain=s=>decode(s.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
function validItem(title,rawUrl,date,source){
 try{
  const url=new URL(decode(rawUrl),source.url);url.search='';url.hash='';
  if(url.protocol!=='https:'||url.hostname!==new URL(source.url).hostname||title.length<5||title.length>240)return null;
  const time=new Date(date);if(!Number.isFinite(time.getTime())||time.getTime()>Date.now()+86400000)return null;
  return {title,url:url.href,publishedAt:time.toISOString(),source:source.name};
 }catch{return null;}
}
export function parseNews(text,source){
 const rows=[];
 if(source.kind==='rss'){
  for(const item of text.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)){
   const tag=name=>item[1].match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`,'i'))?.[1]||'';
   const row=validItem(plain(decode(tag('title'))),tag('link'),tag('pubDate'),source);if(row)rows.push(row);
  }
 }else{
  for(const item of text.matchAll(/<a\b[^>]*href="([^"]*\/news\/20\d\d\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)){
   const parts=item[1].match(/\/news\/(\d{4})\/([a-z]+)\/(\d{2})\//i);if(!parts)continue;
   const title=plain(item[2].match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1]||item[2]).replace(/\s+(?:Announcements|Tournaments|Draws)\s+.*$/,'');
   const row=validItem(title,item[1],`${parts[2]} ${parts[3]}, ${parts[1]} 00:00:00 GMT`,source);if(row)rows.push(row);
  }
 }
 return [...new Map(rows.map(r=>[r.url,r])).values()];
}
export async function updateNews(){
 let previous={items:[],sources:[]};
 try{previous=JSON.parse(await readFile(output,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
 const checkedAt=new Date().toISOString(),items=new Map((previous.items||[]).map(r=>[r.url,r])),statuses=[];
 let successes=0;
 for(const source of sources){
  try{
   const response=await fetch(source.url,{signal:AbortSignal.timeout(25000),headers:{'user-agent':'TheSnookerCalendar/0.2 (+https://snookercalendar.com/contact/)'}});
   if(!response.ok)throw new Error(`HTTP ${response.status}`);
   const rows=parseNews(await response.text(),source);if(!rows.length)throw new Error('No valid dated headlines; previous items retained');
   rows.forEach(r=>items.set(r.url,{...r,firstSeen:items.get(r.url)?.firstSeen||checkedAt}));
   statuses.push({...source,status:'ok',checkedAt,count:rows.length});successes++;
  }catch(error){statuses.push({...source,status:'failed',checkedAt,message:String(error)});console.error(`${source.name}: ${error.message}`);}
 }
 if(!successes)throw new Error('All news sources failed; previous publication retained');
 const data={checkedAt,intervalMinutes:120,items:[...items.values()].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)).slice(0,60),sources:statuses};
 const db=await openDatabase(process.env.SNOOKER_DB_PATH);
 if(db){try{
  db.exec('BEGIN IMMEDIATE');
  const put=db.prepare('INSERT INTO news_items(url,title,source,published_at,first_seen_at,checked_at) VALUES(?,?,?,?,?,?) ON CONFLICT(url) DO UPDATE SET title=excluded.title,checked_at=excluded.checked_at');
  for(const item of data.items)put.run(item.url,item.title,item.source,item.publishedAt,item.firstSeen,checkedAt);
  for(const s of statuses)db.prepare('INSERT INTO source_runs(job_name,source_url,started_at,finished_at,run_status,record_count,message) VALUES(?,?,?,?,?,?,?)').run('news',s.url,checkedAt,new Date().toISOString(),s.status==='ok'?'success':'failed',s.count||0,s.message||s.name);
  db.exec('COMMIT');
 }catch(error){db.exec('ROLLBACK');throw error;}finally{db.close();}}
 await mkdir(dirname(output),{recursive:true});await writeFile(`${output}.next`,JSON.stringify(data,null,2)+'\n');await rename(`${output}.next`,output);
 console.log(`Published ${data.items.length} dated news links from ${successes} sources`);
}
if(import.meta.url===new URL(process.argv[1],'file:').href)await updateNews();
