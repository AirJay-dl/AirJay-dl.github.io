import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const projectRoot=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const schemaPath=resolve(projectRoot,'database/schema.sql');

export async function openDatabase(path=process.env.SNOOKER_DB_PATH){
  if(!path)return null;
  const {DatabaseSync}=await import('node:sqlite');
  mkdirSync(dirname(path),{recursive:true});
  const db=new DatabaseSync(path);
  db.exec('PRAGMA busy_timeout = 5000');
  db.exec(readFileSync(schemaPath,'utf8'));
  return db;
}

function scoreParts(score){
  const match=String(score||'').match(/^(\d+)\D+(\d+)$/);
  return match?[Number(match[1]),Number(match[2])]:[null,null];
}

export async function recordTournamentSnapshot({event,data,matches,databasePath}){
  const db=await openDatabase(databasePath);
  if(!db)return;
  const startedAt=new Date().toISOString();
  const transaction=()=>{
    db.prepare(`INSERT INTO tournaments
      (slug,source_event_id,name,start_date,end_date,tour,event_type,source_url,status,checked_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET source_event_id=excluded.source_event_id,name=excluded.name,
      start_date=excluded.start_date,end_date=excluded.end_date,event_type=excluded.event_type,
      source_url=excluded.source_url,status=excluded.status,checked_at=excluded.checked_at,updated_at=CURRENT_TIMESTAMP`)
      .run(event.slug,event.id,event.name,event.start,event.end,'Main',event.type,event.source,data.status,new Date().toISOString());
    const tournament=db.prepare('SELECT id FROM tournaments WHERE slug=?').get(event.slug);
    const upsert=db.prepare(`INSERT INTO matches
      (tournament_id,source_key,round_name,player_one,player_two,player_one_score,player_two_score,score_text,match_status,scheduled_at,source_url,checked_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
      ON CONFLICT(tournament_id,source_key) DO UPDATE SET round_name=excluded.round_name,
      player_one=excluded.player_one,player_two=excluded.player_two,player_one_score=excluded.player_one_score,
      player_two_score=excluded.player_two_score,score_text=excluded.score_text,match_status=excluded.match_status,
      scheduled_at=excluded.scheduled_at,source_url=excluded.source_url,checked_at=excluded.checked_at,updated_at=CURRENT_TIMESTAMP`);
    matches.forEach((match,index)=>{
      const [one,two]=scoreParts(match.score);
      const status=match.complete?'complete':match.started?'live':'scheduled';
      const key=[match.round,match.playerOne,match.playerTwo,match.sortAt||index].join('|');
      upsert.run(tournament.id,key,match.round,match.playerOne,match.playerTwo,one,two,match.score||null,status,match.sortAt||null,event.source,new Date().toISOString());
    });
    db.prepare(`INSERT INTO source_runs (job_name,source_url,started_at,finished_at,run_status,record_count,message)
      VALUES (?,?,?,?,?,?,?)`).run('live-score',event.source,startedAt,new Date().toISOString(),'success',matches.length,`Stored ${data.eventName}`);
  };
  db.exec('BEGIN IMMEDIATE');
  try{transaction();db.exec('COMMIT')}catch(error){db.exec('ROLLBACK');throw error}finally{db.close()}
}

export async function recordRankingSnapshot({snapshot,databasePath}){
  const db=await openDatabase(databasePath);
  if(!db)return;
  const startedAt=new Date().toISOString();
  db.exec('BEGIN IMMEDIATE');
  try{
    for(const [type,list] of [['official',snapshot.official],['live',snapshot.live]]){
      const result=db.prepare(`INSERT INTO ranking_lists (list_type,label,source_url,checked_at)
        VALUES (?,?,?,?)`).run(type,list.label,snapshot.source,new Date().toISOString());
      const insert=db.prepare(`INSERT INTO ranking_positions
        (ranking_list_id,rank,player_slug,player_name,country,prize_money) VALUES (?,?,?,?,?,?)`);
      for(const row of list.positions)insert.run(result.lastInsertRowid,row.rank,row.slug,row.name,row.country,row.money);
    }
    db.prepare(`INSERT INTO source_runs (job_name,source_url,started_at,finished_at,run_status,record_count,message)
      VALUES (?,?,?,?,?,?,?)`).run('rankings',snapshot.sourceApi,startedAt,new Date().toISOString(),'success',100,snapshot.official.label);
    db.exec('COMMIT');
  }catch(error){db.exec('ROLLBACK');throw error}finally{db.close()}
}
