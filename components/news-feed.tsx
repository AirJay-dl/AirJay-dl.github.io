'use client';
import {useEffect,useState} from 'react';
import type {TournamentUpdate} from '@/content/tournament-updates';
import {href} from '@/lib/site';
import initialNews from '@/public/data/news.json';
import initialScores from '@/public/data/live-score.json';

export function NewsFeed({limit=12}:{limit?:number}){
 const [data,setData]=useState(initialNews);
 const [scores,setScores]=useState<TournamentUpdate & {eventSlug:string;eventName:string}>(initialScores);
 useEffect(()=>{
  let active=true;
  async function refresh(){
   await Promise.allSettled([
    fetch(href('/data/news.json'),{cache:'no-store'}).then(r=>r.ok?r.json() as Promise<typeof initialNews>:null).then(next=>{if(active&&next?.items?.length)setData(next)}),
    fetch(href('/data/live-score.json'),{cache:'no-store'}).then(r=>r.ok?r.json() as Promise<TournamentUpdate & {eventSlug:string;eventName:string}>:null).then(next=>{if(active&&next?.eventSlug)setScores(next)}),
   ]);
  }
  void refresh();const timer=window.setInterval(refresh,300000);return()=>{active=false;window.clearInterval(timer)};
 },[]);
 const date=(value:string)=>new Date(value).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
 const latest=scores.verifiedResults.slice(-3);
 return <section className="news-feed" aria-label="Latest snooker updates">
  <article className="news-briefing"><p className="eyebrow">RESULTS BRIEFING · {scores.checked}</p><h2><a href={href(`/tournaments/${scores.eventSlug}/`)}>{scores.eventName}: latest results</a></h2><p>{scores.status}. Our current snapshot includes {scores.verifiedResults.length} completed matches{(scores.liveMatches||[]).length?`, with ${(scores.liveMatches||[]).length} matches in progress`:''}.</p>{latest.length>0&&<p>{latest.map(m=>`${m.playerOne} ${m.score} ${m.playerTwo}`).join(' · ')}.</p>}<a href={href('/results/')}>View scores and upcoming matches ↗</a><p className="data-source">A data-generated summary, updated with the score feed. Data source: <a href={scores.source}>Snooker.org</a>.</p></article>
  <div className="section-bar"><div><p className="eyebrow">FROM THE OFFICIAL SOURCES</p><h2>Latest snooker headlines</h2></div><span>Checked {date(data.checkedAt)}</span></div>
  <p>Official news links, checked every two hours. Publication dates below belong to the source; reports open on the publisher’s website.</p>
  <div className="story-grid">{data.items.slice(0,limit).map(item=><article className="story-card" key={item.url}><p className="eyebrow">{item.source} · <time dateTime={item.publishedAt}>{date(item.publishedAt)}</time></p><h3><a href={item.url}>{item.title}</a></h3><a className="text-link" href={item.url}>Read at {item.source} ↗</a></article>)}</div>
  {data.sources.some(s=>s.status==='failed')&&<p role="status">One news source is temporarily unavailable. Previously verified links remain available.</p>}
 </section>;
}
