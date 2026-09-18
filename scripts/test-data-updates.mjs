import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {recordRankingSnapshot,readPlayerCatalog,openDatabase} from './database.mjs';
import {parseNews} from './watch-news-sources.mjs';
import {validateList} from './update-rankings.mjs';
const dir=await mkdtemp(join(tmpdir(),'snooker-db-test-'));
try{
 const path=join(dir,'test.db'),snapshot=JSON.parse(await readFile('public/data/rankings.json','utf8'));
 validateList(snapshot.official);validateList(snapshot.live);
 await recordRankingSnapshot({snapshot,databasePath:path});
 const first=await readPlayerCatalog(path),count=first.length;assert.ok(count>=100);
 await recordRankingSnapshot({snapshot,databasePath:path});assert.equal((await readPlayerCatalog(path)).length,count);
 // Incoming/outgoing players: keep archived player and add new identity.
 const old=snapshot.official.positions[0];const incoming={...old,slug:'test-new-player',sourceId:'test-new-id',name:'Test New Player'};
 snapshot.official.positions[0]=incoming;snapshot.live.positions=snapshot.live.positions.filter(p=>p.slug!==old.slug);
 await recordRankingSnapshot({snapshot,databasePath:path});
 const next=await readPlayerCatalog(path);assert.equal(next.length,count+1);assert.equal(next.find(p=>p.slug===old.slug).rank,null);assert.equal(next.find(p=>p.slug===old.slug).liveRank,null);
 const db=await openDatabase(path);assert.equal(db.prepare('PRAGMA integrity_check').get().integrity_check,'ok');db.close();
 const source={name:'Test',url:'https://example.com/feed/',kind:'rss'};
 const xml='<rss><channel><item><title><![CDATA[Test &amp; news]]></title><link>https://example.com/story/?utm_source=rss</link><pubDate>Thu, 17 Sep 2026 12:00:00 GMT</pubDate></item><item><title>Bad URL</title><link>javascript:alert(1)</link><pubDate>Thu, 17 Sep 2026 12:00:00 GMT</pubDate></item></channel></rss>';
 const news=parseNews(xml,source);assert.equal(news.length,1);assert.equal(news[0].title,'Test & news');assert.equal(news[0].url,'https://example.com/story/');assert.equal(parseNews('broken',source).length,0);
 assert.throws(()=>validateList({...snapshot.official,positions:snapshot.official.positions.slice(1)}));
 console.log('PASS: Top 100 validation, player retention, idempotent upsert, SQLite integrity, dated/safe news parsing');
}finally{await rm(dir,{recursive:true,force:true})}
