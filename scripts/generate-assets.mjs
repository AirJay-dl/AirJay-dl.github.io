import {mkdirSync,writeFileSync} from 'node:fs';
import {events,months,inMonth} from '../content/events.ts';
import {articles} from '../content/articles.ts';
import {players} from '../content/players.ts';
const origin=(process.env.NEXT_PUBLIC_SITE_URL||'https://snookercalendar.com').replace(/\/$/,'');
const escapeXml=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const escapeIcs=s=>s.replaceAll('\\','\\\\').replaceAll('\n','\\n').replaceAll(',','\\,').replaceAll(';','\\;');
const fold=line=>{let parts=[],segment='',bytes=0;for(const char of line){const n=Buffer.byteLength(char);if(bytes+n>73){parts.push(segment);segment=' ';bytes=1;}segment+=char;bytes+=n;}parts.push(segment);return parts.join('\r\n')};
const ics=rows=>['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//The Snooker Calendar//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:The Snooker Calendar',...rows.flatMap(e=>{const end=new Date(e.end+'T12:00:00Z');end.setUTCDate(end.getUTCDate()+1);return ['BEGIN:VEVENT',`UID:${e.slug}@snooker-calendar`,`DTSTAMP:20260905T000000Z`,`DTSTART;VALUE=DATE:${e.start.replaceAll('-','')}`,`DTEND;VALUE=DATE:${end.toISOString().slice(0,10).replaceAll('-','')}`,`SUMMARY:${escapeIcs(e.name)}`,`LOCATION:${escapeIcs(`${e.venue}, ${e.city}, ${e.country}`)}`,`DESCRIPTION:${escapeIcs(`${e.note}\nChecked 5 September 2026. Dates may change. One-time import; recheck the organiser.\nSource: ${e.source}`)}`,`URL:${e.source}`,'TRANSP:TRANSPARENT','END:VEVENT']}),'END:VCALENDAR'].map(fold).join('\r\n')+'\r\n';
mkdirSync('public/calendars',{recursive:true});
writeFileSync('public/calendars/season.ics',ics(events));for(const m of months)writeFileSync(`public/calendars/${m.value}.ics`,ics(events.filter(e=>inMonth(e,m.value))));for(const e of events)writeFileSync(`public/calendars/${e.slug}.ics`,ics([e]));
const paths=['/','/calendar/season/',...months.map(m=>`/calendar/${m.value}/`),...['news','stories','players','rankings','stats','about','editorial-policy','contact','privacy','terms'].map(p=>`/${p}/`),...articles.map(a=>`/${a.category==='News'?'news':'stories'}/${a.slug}/`),...players.map(p=>`/players/${p.slug}/`),...events.map(e=>`/tournaments/${e.slug}/`)];
writeFileSync('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${escapeXml(origin+p)}</loc><lastmod>2026-09-05</lastmod></url>`).join('')}</urlset>`);
writeFileSync('public/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
writeFileSync('public/feed.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The Snooker Calendar</title><link>${escapeXml(origin)}</link><description>Snooker news, stories and guides</description><language>en-gb</language>${articles.map(a=>`<item><title>${escapeXml(a.title)}</title><link>${escapeXml(origin+`/${a.category==='News'?'news':'stories'}/${a.slug}/`)}</link><guid>${escapeXml(origin+`/${a.category==='News'?'news':'stories'}/${a.slug}/`)}</guid><pubDate>${new Date(a.date+'T00:00:00Z').toUTCString()}</pubDate><description>${escapeXml(a.description)}</description></item>`).join('')}</channel></rss>`);
writeFileSync('public/.nojekyll','');
if(process.env.CUSTOM_DOMAIN){if(!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(process.env.CUSTOM_DOMAIN))throw Error('Invalid custom domain');writeFileSync('public/CNAME',process.env.CUSTOM_DOMAIN+'\n');}
console.log(`Generated sitemap for ${paths.length} pages, RSS, robots and ${13+events.length} calendar files.`);
