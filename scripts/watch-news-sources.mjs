import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';

const output = process.env.NEWS_WATCH_OUTPUT || '/srv/snookercalendar/automation/news-candidates.json';
const source = 'https://www.wst.tv/news/';
const response = await fetch(source, {headers: {'user-agent': 'TheSnookerCalendar/0.1 (+https://snookercalendar.com/contact/)'}});
if (!response.ok) throw new Error(`WST news returned HTTP ${response.status}`);
const html = await response.text();
if (html.length < 50_000) throw new Error('WST news validation failed; previous candidate list retained');

const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ');
const plain = (value) => decode(value.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const candidates = [];
const seen = new Set();
for (const match of html.matchAll(/<a\b[^>]*href="([^"]*\/news\/20\d\d\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
  const url = new URL(match[1], source).toString();
  const title = plain(match[2]);
  if (seen.has(url) || title.length < 8 || title.length > 180) continue;
  seen.add(url);
  candidates.push({title, url});
}

let previous = {candidates: []};
try { previous = JSON.parse(await readFile(output, 'utf8')); } catch {}
const previousUrls = new Set(previous.candidates.map(item => item.url));
const data = {
  checkedAt: new Date().toISOString(),
  source,
  candidates: candidates.slice(0, 30),
  newCandidates: candidates.filter(item => !previousUrls.has(item.url)).slice(0, 30),
  editorialRule: 'Candidate links only. Publish an original briefing after facts and source dates are verified.',
};

await mkdir(dirname(output), {recursive: true});
const temporary = `${output}.next`;
await writeFile(temporary, JSON.stringify(data, null, 2) + '\n');
await rename(temporary, output);
console.log(`Checked WST news: ${data.candidates.length} candidates, ${data.newCandidates.length} new`);
