'use client';
import {useEffect,useState} from 'react';
import initial from '@/public/data/players.json';
import {players as builtPlayers} from '@/content/players';
import {href} from '@/lib/site';
export function useCatalog(){
 const [catalog,setCatalog]=useState(initial);
 useEffect(()=>{let active=true;const refresh=async()=>{try{const r=await fetch(href('/data/players.json'),{cache:'no-store'});if(r.ok){const next=await r.json() as typeof initial;if(active&&Array.isArray(next.players)&&next.players.length)setCatalog(next)}}catch{}};void refresh();const id=window.setInterval(refresh,1800000);return()=>{active=false;window.clearInterval(id)}},[]);
 return catalog;
}
export function PlayerDirectory(){
 const catalog=useCatalog();
 return <><p className="data-source">{catalog.players.length} stored players · {catalog.rankingLabel}. Players remain in the directory after leaving the Top 100.</p><div className="profile-grid">{catalog.players.map(p=><article className="profile-card" key={p.slug}><div className="initials" aria-hidden="true">{p.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div><div><p className="eyebrow">{p.country} · {p.rank?`WORLD NO. ${p.rank}`:'Outside current official Top 100'}</p><h2><a href={href(builtPlayers.some(b=>b.slug===p.slug)?`/players/${p.slug}/`:`/players/profile/?player=${encodeURIComponent(p.slug)}`)}>{p.name}</a></h2><p>{p.turnedPro?`Turned professional in ${p.turnedPro}.`:'Professional debut not recorded.'}</p></div></article>)}</div></>;
}
export function PlayerFacts({slug}:{slug:string}){
 const catalog=useCatalog(),p=catalog.players.find(p=>p.slug===slug);
 if(!p)return null;
 return <><dl className="fact-grid player-facts"><div><dt>Official world ranking</dt><dd>{p.rank?`No. ${p.rank}`:'Outside Top 100'}</dd></div><div><dt>Live ranking</dt><dd>{p.liveRank?`No. ${p.liveRank}`:'Outside Top 100'}</dd></div><div><dt>Two-year ranking money</dt><dd>{p.rankingMoney==null?'Not in current lists':`£${p.rankingMoney.toLocaleString('en-GB')}`}</dd></div><div><dt>Represents</dt><dd>{p.country}</dd></div><div><dt>Born</dt><dd>{p.born||'Not recorded'}</dd></div><div><dt>First turned pro</dt><dd>{p.turnedPro||'Not recorded'}</dd></div></dl><p className="data-source">{catalog.rankingLabel} · Checked {catalog.checkedAt}. <a href={p.source}>WST profile ↗</a></p></>;
}
export function StoredPlayer(){
 const catalog=useCatalog();const [slug,setSlug]=useState('');
 useEffect(()=>setSlug(new URLSearchParams(window.location.search).get('player')||''),[]);
 const p=catalog.players.find(p=>p.slug===slug);
 return <>{p?<><h1>{p.name}</h1><PlayerFacts slug={p.slug}/><p>This player was recorded from the WST ranking lists. The archive retains the record even when the player leaves the current Top 100.</p></>:<><h1>Player record</h1><p>Select a player from the <a href={href('/players/')}>player directory</a>.</p></>}</>;
}
