'use client';

import {useEffect,useState} from 'react';
import type {TournamentUpdate} from '@/content/tournament-updates';
import {events} from '@/content/events';
import {href} from '@/lib/site';

type ResultsData=TournamentUpdate&{eventSlug:string;eventName:string};

export function ResultsHub({initialData}:{initialData:ResultsData}){
  const [data,setData]=useState(initialData);
  useEffect(()=>{
    let mounted=true;
    const refresh=async()=>{
      try{
        const response=await fetch(href('/data/live-score.json'),{cache:'no-store'});
        if(!response.ok)return;
        const next=await response.json() as ResultsData;
        if(mounted&&next.eventSlug)setData(next);
      }catch{}
    };
    void refresh();
    const timer=window.setInterval(refresh,60_000);
    return()=>{mounted=false;window.clearInterval(timer)};
  },[]);
  const live=data.liveMatches||[];
  const completed=events.filter(event=>event.winner).slice(-6).reverse();
  return <>
    <section className="results-status" aria-live="polite">
      <div><span className="season-status-label"><i/>Latest score feed</span><h2>{data.eventName}</h2><p>{data.status} · Checked {data.checked}</p></div>
      <a className="action-link" href={href(`/tournaments/${data.eventSlug}/`)}>Full tournament page</a>
    </section>

    {live.length>0&&<section className="results-section"><div className="section-bar"><div><p className="eyebrow">IN PLAY</p><h2>Snooker live scores</h2></div><span>Refreshes every minute</span></div><div className="match-list">{live.map(match=><div className="match-row live-match-row" key={`${match.round}-${match.playerOne}`}><span>{match.round}</span><span className="match-player">{match.playerOne}</span><strong className="match-score">{match.score}</strong><span className="match-player">{match.playerTwo}</span></div>)}</div></section>}

    <section className="results-section"><div className="section-bar"><div><p className="eyebrow">COMPLETED MATCHES</p><h2>Latest snooker results</h2></div><a href={href(`/tournaments/${data.eventSlug}/#results`)}>Event results ↗</a></div><div className="match-list">{data.verifiedResults.map(match=><div className="match-row" key={`${match.round}-${match.playerOne}`}><span>{match.round}</span><span className="match-player">{match.playerOne}</span><strong className="match-score">{match.score}</strong><span className="match-player">{match.playerTwo}</span></div>)}</div></section>

    {data.upcoming.length>0&&<section className="results-section"><div className="section-bar"><div><p className="eyebrow">COMING UP</p><h2>Next scheduled matches</h2></div><a href={href('/calendar/season/')}>Full schedule ↗</a></div><div className="match-list">{data.upcoming.map(match=><div className="match-row scheduled-match" key={`${match.playerOne}-${match.playerTwo}`}><span>{match.round}</span><span className="match-player">{match.playerOne}</span><span className="match-player">{match.playerTwo}</span><time>{match.timing}</time></div>)}</div></section>}

    <section className="results-archive"><div><p className="eyebrow">RESULT ARCHIVE</p><h2>Browse completed tournaments</h2><p>Completed tournament pages remain available with the champion, final score and source details.</p></div><div>{completed.map(event=><a key={event.slug} href={href(`/tournaments/${event.slug}/`)}><span>{event.name}</span><strong>{event.winner} {event.finalScore}</strong></a>)}</div></section>

    <aside className="results-method"><strong>Data source: <a href={data.source}>{data.sourceLabel} ↗</a></strong><p>The score feed is checked every 15 minutes during active events. “Live” appears only when the source reports a match in progress; otherwise this page presents the latest verified scores and scheduled matches.</p></aside>
  </>;
}
