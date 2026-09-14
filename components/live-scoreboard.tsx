'use client';

import {useEffect, useState} from 'react';
import {href} from '@/lib/site';
import type {TournamentUpdate} from '@/content/tournament-updates';

type LiveScoreData = TournamentUpdate & {
  eventSlug: string;
  eventName: string;
};

export function LiveScoreboard({initialData}: {initialData: LiveScoreData}) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch(href('/data/live-score.json'), {cache: 'no-store'});
        if (!response.ok) return;
        const next = await response.json() as LiveScoreData;
        if (active) setData(next);
      } catch {
        // Keep the last verified snapshot when the update endpoint is unavailable.
      }
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const headlineResults = data.verifiedResults.slice(0, 3);
  const nextMatch = data.upcoming[0];

  return (
    <aside className="event-scoreboard" aria-labelledby="featured-event-title">
      <header className="scoreboard-header">
        <div>
          <p className="eyebrow">CURRENT TOURNAMENT</p>
          <h2 id="featured-event-title">{data.eventName}</h2>
        </div>
        <span className="scoreboard-status">{data.status}</span>
      </header>

      {data.liveMatches?.length ? <section className="scoreboard-block live-block">
        <p className="scoreboard-label"><span className="live-dot"/>In progress</p>
        {data.liveMatches.map((match) => <div className="scoreboard-match" key={`${match.round}-${match.playerOne}`}>
          <span>{match.round}</span><strong>{match.playerOne}</strong><b>{match.score}</b><strong>{match.playerTwo}</strong>
        </div>)}
      </section> : null}

      <section className="scoreboard-block">
        <p className="scoreboard-label">Latest verified results</p>
        {headlineResults.map((match) => <div className="scoreboard-match" key={`${match.round}-${match.playerOne}`}>
          <span>{match.round}</span><strong>{match.playerOne}</strong><b>{match.score}</b><strong>{match.playerTwo}</strong>
        </div>)}
      </section>

      {nextMatch ? <section className="scoreboard-next">
        <div><span>Next match · {nextMatch.round}</span><strong>{nextMatch.playerOne} <i>v</i> {nextMatch.playerTwo}</strong></div>
        <time>{nextMatch.timing}</time>
      </section> : null}

      <footer className="scoreboard-footer">
        <span>Checked {data.checked}</span>
        <a href={href(`/tournaments/${data.eventSlug}/`)}>Full schedule, draw & results ↗</a>
      </footer>
    </aside>
  );
}
