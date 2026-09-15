import {notFound} from 'next/navigation';
import Calendar from '@/components/calendar';
import {SeasonStatus} from '@/components/season-status';
import {months} from '@/content/events';
import {absolute,href,jsonLd,metadata as pageMeta} from '@/lib/site';
import liveScoreSnapshot from '@/public/data/live-score.json';

export function generateStaticParams(){return [...months.map(month=>({month:month.value})),{month:'season'}]}

export async function generateMetadata({params}:{params:Promise<{month:string}>}){
  const {month}=await params;
  const monthLabel=months.find(item=>item.value===month)?.label;
  if(month!=='season'&&!monthLabel)return {};
  const title=month==='season'?'Snooker Schedule 2026/27: Calendar, Fixtures & Results':`${monthLabel} Snooker Calendar — Dates & Venues`;
  const description=month==='season'?'Complete 2026/27 snooker schedule with tournament dates, fixtures, current event status, results links and downloadable calendar files.':`Snooker tournaments in ${monthLabel}: event dates, locations, qualifying rounds and downloadable all-day calendar entries.`;
  return pageMeta(title,description,`/calendar/${month}/`);
}

export default async function Page({params}:{params:Promise<{month:string}>}){
  const {month}=await params;
  if(month!=='season'&&!months.some(item=>item.value===month))notFound();
  const season=month==='season';
  const monthLabel=months.find(item=>item.value===month)?.label;
  const faq=[
    {q:'What is the next snooker tournament?',a:'The current and next tournament panels use the latest published event feed. Dates can change, so open the linked tournament page before making travel plans.'},
    {q:'What dates does the 2026/27 snooker season cover?',a:'This calendar covers listed events from June 2026 through May 2027, including the main professional tour and selected qualifying and international events.'},
    {q:'Are qualifying events included?',a:'Yes. Qualifying stages are listed separately when they take place on different dates or at a different venue from the main tournament.'},
    {q:'How often can snooker fixtures change?',a:'Session times, venues and draws may change after the calendar is published. Each page shows its source and check date, while active-event scores are checked every 15 minutes.'},
  ];
  const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(item=>({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))};
  const breadcrumbSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:absolute('/')},{'@type':'ListItem',position:2,name:'2026/27 snooker schedule',item:absolute('/calendar/season/')}]};
  return <main id="main">
    <div className="breadcrumbs"><a href={href('/')}>Home</a> / {season?'2026/27 schedule':monthLabel}</div>
    <section className="intro compact"><div><p className="eyebrow">2026 / 27 SEASON CALENDAR</p><h1>{season?'2026/27 Snooker Schedule and Calendar':monthLabel}</h1><p className="lede">{season?'Browse the complete snooker schedule, fixtures and tournament dates from June 2026 to May 2027. Follow the active event, find what comes next and open each tournament for its draw and results.':'Main-tour events and qualifiers for this month, with tournament pages for schedules, draws and results.'}</p></div></section>
    {season&&<SeasonStatus initialData={liveScoreSnapshot}/>}
    <Calendar month={season?'all':month}/>
    {season&&<>
      <section className="calendar-links"><h2>Follow the season</h2><a href={href('/results/')}>Latest snooker results ↗</a><a href={href('/rankings/')}>Current world rankings ↗</a><a href={href('/players/')}>Player profiles ↗</a><a href={href('/stories/how-to-follow-a-snooker-season/')}>How to follow a snooker season ↗</a></section>
      <section className="faq-section"><p className="eyebrow">QUICK ANSWERS</p><h2>Snooker schedule FAQ</h2>{faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(faqSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumbSchema)}}/>
    </>}
  </main>;
}
