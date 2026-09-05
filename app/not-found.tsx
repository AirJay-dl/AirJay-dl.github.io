import {href} from '@/lib/site';
export default function NotFound(){return <main id="main"><section className="intro"><div><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>That frame is missing.</h1><p className="lede">This page may have moved, or the address may be incorrect.</p><a className="action-link" href={href('/')}>Return to the calendar →</a></div></section></main>}
