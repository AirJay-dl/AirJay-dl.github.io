import {rmSync,cpSync,mkdirSync,readdirSync,renameSync,existsSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
// GitHub Pages expects /path/index.html for clean directory URLs.
// Keep the framework's export untouched; stage only public output in out/.
rmSync('out',{recursive:true,force:true});
mkdirSync('out',{recursive:true});
cpSync('dist/client','out',{recursive:true});
function normalize(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory()){normalize(path);continue}if(entry.name.endsWith('.html')&&!['index.html','404.html'].includes(entry.name)){const target=path.slice(0,-5);mkdirSync(target,{recursive:true});renameSync(path,join(target,'index.html'));}}}
normalize('out');
writeFileSync('out/.nojekyll','');
// A useful static 404, with no redirect to the home page and no soft-404 status.
if(!existsSync('out/404.html')){const base=process.env.NEXT_PUBLIC_BASE_PATH||'';writeFileSync('out/404.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found — The Snooker Calendar</title><body style="font:18px/1.7 Arial,sans-serif;max-width:700px;margin:12vh auto;padding:24px;color:#173f2c"><p>THE SNOOKER CALENDAR</p><h1>That frame is missing.</h1><p>The page may have moved or the address may be incorrect.</p><a href="${base}/">Return to the calendar</a></body></html>`)}
console.log('Static GitHub Pages output prepared in out/.');
