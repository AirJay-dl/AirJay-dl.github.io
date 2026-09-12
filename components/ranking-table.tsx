'use client';

import {useEffect,useState} from 'react';
import {href} from '@/lib/site';

type Position={rank:number;name:string;slug:string;country:string;money:number};
type List={label:string;positions:Position[]};
export type RankingSnapshot={checked:string;source:string;official:List;live?:List};

const money=(value:number)=>`£${value.toLocaleString('en-GB')}`;

export function RankingTable({initial}:{initial:RankingSnapshot}){
 const [snapshot,setSnapshot]=useState(initial);
 const [mode,setMode]=useState<'official'|'live'>('official');
 useEffect(()=>{
  const refresh=async()=>{
   try{
    const response=await fetch('/data/rankings.json',{cache:'no-store'});
    if(!response.ok)return;
    const next=await response.json() as RankingSnapshot;
    if(next.official?.positions?.length===50)setSnapshot(next);
   }catch{}
  };
  void refresh();
  const timer=window.setInterval(refresh,30*60*1000);
  return()=>window.clearInterval(timer);
 },[]);
 const list=mode==='live'&&snapshot.live?snapshot.live:snapshot.official;
 return <>
  <div className="ranking-controls" aria-label="Ranking list selection">
   <button type="button" className={mode==='official'?'active':''} onClick={()=>setMode('official')}>Official ranking</button>
   <button type="button" className={mode==='live'?'active':''} disabled={!snapshot.live} onClick={()=>setMode('live')}>Live ranking</button>
  </div>
  <div className="ranking-status"><strong>{mode==='live'&&snapshot.live?'Live projection':'Official list'}</strong><span>{list.label}</span><span>Updated {snapshot.checked}</span></div>
  <div className="table-wrap"><table><caption>Top 50 world snooker rankings</caption><thead><tr><th>Rank</th><th>Player</th><th>Represents</th><th>Ranking money</th></tr></thead><tbody>{list.positions.map(row=><tr key={row.slug}><td>{row.rank}</td><th scope="row"><a href={href(`/players/${row.slug}/`)}>{row.name}</a></th><td>{row.country}</td><td>{money(row.money)}</td></tr>)}</tbody></table></div>
  <p className="data-source"><strong>Data source: <a href={snapshot.source}>World Snooker Tour ↗</a></strong> · Official rankings are confirmed lists. Live rankings are provisional and can change as the current tournament progresses.</p>
 </>;
}
