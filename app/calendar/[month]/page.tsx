import Calendar from '@/components/calendar';
import {months} from '@/content/events';
import {metadata as pageMeta} from '@/lib/site';
import {notFound} from 'next/navigation';
export function generateStaticParams(){return [...months.map(m=>({month:m.value})),{month:'season'}]}
export async function generateMetadata({params}:{params:Promise<{month:string}>}){const {month}=await params;const title=month==='season'?'2026/27 Season':months.find(m=>m.value===month)?.label;if(!title)return {};return pageMeta(`${title} Snooker Calendar — Dates & Venues`,`Snooker tournaments in ${title}: event dates, locations, qualifying rounds and downloadable all-day calendar entries.`,`/calendar/${month}/`)}
export default async function Page({params}:{params:Promise<{month:string}>}){const {month}=await params;if(month!=='season'&&!months.some(m=>m.value===month))notFound();return <main id="main"><section className="intro compact"><div><p className="eyebrow">2026 / 27 SEASON CALENDAR</p><h1>{month==='season'?'The season, in full.':months.find(m=>m.value===month)?.label}</h1><p className="lede">Main-tour events and qualifiers. Dates checked 5 September 2026.</p></div></section><Calendar month={month==='season'?'all':month}/></main>}
