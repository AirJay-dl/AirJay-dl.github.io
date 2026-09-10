import {notFound} from 'next/navigation';
import {articles} from '@/content/articles';
import {players} from '@/content/players';
import {events, dateLabel} from '@/content/events';
import {tournamentUpdates} from '@/content/tournament-updates';
import {metadata as pageMeta, href, absolute, jsonLd, site} from '@/lib/site';

export function generateStaticParams() {
  return [
    ...articles.map((article) => ({section: article.category === 'News' ? 'news' : 'stories', slug: article.slug})),
    ...players.map((player) => ({section: 'players', slug: player.slug})),
    ...events.map((event) => ({section: 'tournaments', slug: event.slug})),
  ];
}

export async function generateMetadata({params}: {params: Promise<{section: string; slug: string}>}) {
  const {section, slug} = await params;
  const article = articles.find((item) => item.slug === slug && (item.category === 'News' ? 'news' : 'stories') === section);
  const player = section === 'players' ? players.find((item) => item.slug === slug) : null;
  const event = section === 'tournaments' ? events.find((item) => item.slug === slug) : null;
  return pageMeta(
    article?.title || player?.name || `${event?.name || 'Page not found'}: Schedule, Draw & Results`,
    article?.description || player?.description || `${event?.name}: ${event ? dateLabel(event.start, true) : ''} to ${event ? dateLabel(event.end, true) : ''}. Schedule, draw and results with source attribution.`,
    `/${section}/${slug}/`,
  );
}

export default async function Page({params}: {params: Promise<{section: string; slug: string}>}) {
  const {section, slug} = await params;
  const article = articles.find((item) => item.slug === slug && (item.category === 'News' ? 'news' : 'stories') === section);
  const player = section === 'players' ? players.find((item) => item.slug === slug) : null;
  const event = section === 'tournaments' ? events.find((item) => item.slug === slug) : null;

  if (!article && !player && !event) notFound();

  const title = article?.title || player?.name || event!.name;
  const eventUpdate = event ? tournamentUpdates[event.slug] : undefined;
  const checkedLabel = article
    ? new Date(`${article.date}T12:00:00Z`).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'})
    : eventUpdate?.checked || '7 September 2026';
  const checkedDate = article?.date || '2026-09-11';
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: absolute('/')},
      {'@type': 'ListItem', position: 2, name: title, item: absolute(`/${section}/${slug}/`)},
    ],
  };

  return (
    <main id="main" className="article-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd(crumbs)}}/>
      <div className="breadcrumbs"><a href={href('/')}>Home</a> / <a href={href(section === 'tournaments' ? '/calendar/season/' : `/${section}/`)}>{section}</a> / {title}</div>
      <article>
        <header className="article-header">
          <p className="eyebrow">{article?.category || player?.label || `${event!.tour.toUpperCase()} · ${event!.type.toUpperCase()}`}</p>
          <h1>{title}</h1>
          <p className="lede">{article?.description || player?.description || `${dateLabel(event!.start, true)} – ${dateLabel(event!.end, true)} · ${event!.city}, ${event!.country}`}</p>
          <div className="byline"><a href={href('/about/')}>The Snooker Calendar</a><span>·</span><time dateTime={checkedDate}>Checked {checkedLabel}</time></div>
        </header>

        {article && <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            dateModified: article.date,
            inLanguage: 'en',
            mainEntityOfPage: absolute(`/${section}/${slug}/`),
            author: {'@type': 'Organization', name: site.name, url: absolute('/about/')},
            publisher: {'@type': 'Organization', name: site.name, url: absolute('/')},
            isAccessibleForFree: true,
          })}}/>
          <div className="prose">
            {article.sections.map((item) => <section key={item.heading}><h2>{item.heading}</h2>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
            <aside className="sources"><h2>Sources & editorial note</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url}>{source.label} ↗</a></li>)}</ul><p>Original synthesis and commentary, prepared with AI assistance. This article does not claim first-hand reporting or player interviews. <a href={href('/editorial-policy/')}>Read our editorial policy.</a></p></aside>
          </div>
        </>}

        {player && <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({'@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: {'@type': 'Person', name: player.name, jobTitle: 'Professional snooker player', sameAs: player.source}, dateModified: '2026-09-07'})}}/>
          <div className="prose">
            <dl className="fact-grid"><div><dt>Represents</dt><dd>{player.country}</dd></div><div><dt>Born</dt><dd>{player.born}</dd></div><div><dt>First turned pro</dt><dd>{player.pro}</dd></div></dl>
            <h2>Career in focus</h2><p>{player.bio}</p>
            <h2>Three milestones</h2><ul>{player.milestones.map((milestone) => <li key={milestone}>{milestone}</li>)}</ul>
            <h2>A viewing prompt</h2><p>{player.watch}</p>
            <aside className="sources"><h2>Profile source</h2><a href={player.source}>Official player profile ↗</a><p>Biography and viewing guidance are original editorial work. Structured season results and head-to-head records will appear after the data feed is approved.</p></aside>
          </div>
        </>}

        {event && <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'SportsEvent',
            name: event.name,
            startDate: event.start,
            endDate: event.end,
            url: absolute(`/tournaments/${event.slug}/`),
            description: event.note,
            sport: 'Snooker',
            location: {'@type': 'Place', name: event.venue, address: {'@type': 'PostalAddress', addressLocality: event.city, addressCountry: event.country}},
          })}}/>
          <div className="prose">
            <dl className="fact-grid"><div><dt>Dates</dt><dd>{dateLabel(event.start)} – {dateLabel(event.end, true)}</dd></div><div><dt>Venue</dt><dd>{event.venue}</dd></div><div><dt>Tour</dt><dd>{event.tour}</dd></div><div><dt>Type</dt><dd>{event.type}</dd></div></dl>
            <nav className="event-tabs" aria-label="Event page sections"><a href="#schedule">Schedule</a><a href="#draw">Draw</a><a href="#results">Results</a></nav>
            <p>{event.note}</p>

            <section id="schedule">
              <h2>Schedule</h2>
              <p>The event window runs from <strong>{dateLabel(event.start, true)}</strong> to <strong>{dateLabel(event.end, true)}</strong> at {event.venue}, {event.city}. {eventUpdate ? 'The active-event snapshot below is a daily checked update, not a live score feed.' : 'Session-level order of play will be added through the approved data feed. Always check the source before travel.'}</p>
            </section>

            <section id="draw">
              <h2>Draw</h2>
              {eventUpdate ? <>
                <div className="data-status"><strong>{eventUpdate.status}</strong><p>{eventUpdate.summary}</p></div>
                <h3>Verified progression</h3>
                <div className="match-list">{eventUpdate.verifiedResults.map((match) => <div className="match-row" key={`${match.round}-${match.playerOne}`}><span>{match.round}</span><span className="match-player">{match.playerOne}</span><strong className="match-score">{match.score}</strong><span className="match-player">{match.playerTwo}</span></div>)}</div>
                <h3>Next-round pairings shown by the source</h3>
                <div className="match-list">{eventUpdate.upcoming.map((match) => <div className="match-row scheduled-match" key={`${match.playerOne}-${match.playerTwo}`}><span>{match.round}</span><span className="match-player">{match.playerOne}</span><span className="match-player">{match.playerTwo}</span><time>{match.timing}</time></div>)}</div>
              </> : <div className="data-status"><strong>Draw data pending</strong><p>The page structure is ready. The complete draw will appear after Snooker.org API access is approved, so player pairings are not copied manually or presented as live.</p></div>}
            </section>

            <section id="results">
              <h2>Results</h2>
              {event.winner ? <div className="result-card"><span>Final</span><strong>{event.winner} {event.finalScore} {event.runnerUp}</strong>{event.firstPrize && <p>Winner’s prize: {event.firstPrize}</p>}</div> : eventUpdate ? <div className="data-status"><strong>Daily verified snapshot</strong><p>Completed scores are shown in the draw above. The next scheduled check replaces this snapshot only when the source confirms new information.</p></div> : <div className="data-status"><strong>{new Date(event.end + 'T23:59:59Z') < new Date('2026-09-11T00:00:00Z') ? 'Result awaiting verification' : 'Results will appear after play begins'}</strong><p>Verified scores will be added through the authorised feed or a dated manual update. This page does not infer results from an event’s scheduled dates.</p></div>}
            </section>

            <h2>Save the dates</h2><p><a className="action-link" href={href(`/calendars/${event.slug}.ics`)} download>↓ Download this event (.ics)</a></p>
            <aside className="sources"><h2>Data source</h2><p><strong>Data source: <a href={eventUpdate?.source || event.source}>{eventUpdate?.sourceLabel || 'Snooker.org'} ↗</a></strong></p><p>Checked {eventUpdate?.checked || '7 September 2026'}. Dates and venues are a dated snapshot. Session times, draws and results may change.</p></aside>
          </div>
        </>}

        <div className="article-end"><a href={href('/calendar/season/')}>← Explore the season calendar</a><a href={`mailto:${site.email}?subject=${encodeURIComponent('Correction: ' + title)}`}>Suggest a correction ↗</a></div>
      </article>
    </main>
  );
}
