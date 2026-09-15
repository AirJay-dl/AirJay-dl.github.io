'use client';

import {useEffect, useMemo, useState} from 'react';
import {events} from '@/content/events';
import {href} from '@/lib/site';

type ActiveEvent = {eventSlug:string;eventName:string;status:string;checked:string};

export function SeasonStatus({initialData}:{initialData:ActiveEvent}){
  const [active,setActive]=useState<ActiveEvent|null>(initialData);

  useEffect(()=>{
    let mounted=true;
    const refresh=async()=>{
      try{
        const response=await fetch(href('/data/live-score.json'),{cache:'no-store'});
        if(!response.ok)return;
        const next=await response.json() as ActiveEvent;
        if(mounted&&next.eventSlug)setActive(next);
      }catch{}
    };
    void refresh();
    const timer=window.setInterval(refresh,60_000);
    return()=>{mounted=false;window.clearInterval(timer)};
  },[]);

  const nextEvent=useMemo(()=>{
    const activeIndex=active?events.findIndex(event=>event.slug===active.eventSlug):-1;
    return activeIndex>=0?events.slice(activeIndex+1).find(event=>event.start>events[activeIndex].end):events.find(event=>event.start>=new Date().toISOString().slice(0,10));
  },[active]);

  return <section className="season-status" aria-label="Current and next snooker tournaments">
    <div><span className="season-status-label"><i/>Happening now</span><h2>{active?.eventName||'Current tournament'}</h2><p>{active?.status||'Loading the latest verified event status'}{active?.checked?` · Checked ${active.checked}`:''}</p>{active&&<a href={href(`/tournaments/${active.eventSlug}/`)}>Scores, draw and results ↗</a>}</div>
    <div><span className="season-status-label">Up next</span><h2>{nextEvent?.name||'Next tournament'}</h2>{nextEvent&&<><p>{nextEvent.start} – {nextEvent.end} · {nextEvent.city}, {nextEvent.country}</p><a href={href(`/tournaments/${nextEvent.slug}/`)}>Tournament details ↗</a></>}</div>
  </section>;
}
