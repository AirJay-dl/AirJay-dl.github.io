'use client';

import {useEffect, useState} from 'react';
import type {TournamentUpdate} from '@/content/tournament-updates';
import {href} from '@/lib/site';

type LiveTournamentUpdate = TournamentUpdate & {
  eventSlug: string;
  eventName?: string;
};

export function TournamentLiveResults({eventSlug, initialData}: {eventSlug: string; initialData?: TournamentUpdate}) {
  const [data, setData] = useState<TournamentUpdate | null>(initialData || null);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch(href('/data/live-score.json'), {cache: 'no-store'});
        if (!response.ok) return;
        const next = await response.json() as LiveTournamentUpdate;
        if (active && next.eventSlug === eventSlug) setData(next);
      } catch {
        // Keep the latest verified static snapshot if the live file is unavailable.
      }
    };

    void refresh();
    const timer = window.setInterval(() => void refresh(), 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [eventSlug]);

  if (!data) return <>
    <section id="draw"><h2>Draw</h2><div className="data-status"><strong>Draw not yet available here</strong><p>This page checks the active-event feed when it loads. Use the linked source for the latest confirmed pairings.</p></div></section>
    <section id="results"><h2>Results</h2><div className="data-status"><strong>Results will appear after play begins</strong><p>Confirmed scores will appear here automatically while this is the active event.</p></div></section>
  </>;

  const liveMatches = data.liveMatches || [];

  return <>
    <section id="draw">
      <h2>Draw</h2>
      <div className="data-status" aria-live="polite">
        <strong>{data.status}</strong>
        <p>{data.summary}</p>
      </div>
      <h3>Verified progression</h3>
      <div className="match-list">{data.verifiedResults.map((match) => <div className="match-row" key={`${match.round}-${match.playerOne}`}>
        <span>{match.round}</span><span className="match-player">{match.playerOne}</span><strong className="match-score">{match.score}</strong><span className="match-player">{match.playerTwo}</span>
      </div>)}</div>
      {data.upcoming.length ? <>
        <h3>Next-round pairings shown by the source</h3>
        <div className="match-list">{data.upcoming.map((match) => <div className="match-row scheduled-match" key={`${match.playerOne}-${match.playerTwo}`}>
          <span>{match.round}</span><span className="match-player">{match.playerOne}</span><span className="match-player">{match.playerTwo}</span><time>{match.timing}</time>
        </div>)}</div>
      </> : null}
    </section>

    <section id="results">
      <h2>Results</h2>
      {liveMatches.length ? <>
        <div className="data-status live-result-status" aria-live="polite">
          <strong>Match in progress</strong>
          <p>Checked {data.checked}. Scores may trail the table by up to 15 minutes.</p>
        </div>
        <div className="match-list">{liveMatches.map((match) => <div className="match-row live-match-row" key={`${match.round}-${match.playerOne}`}>
          <span>{match.round}</span><span className="match-player">{match.playerOne}</span><strong className="match-score">{match.score}</strong><span className="match-player">{match.playerTwo}</span>
        </div>)}</div>
      </> : null}
      <h3>{data.status === 'Tournament complete' ? 'Final result' : 'Latest verified results'}</h3>
      <div className="match-list">{data.verifiedResults.map((match) => <div className="match-row" key={`result-${match.round}-${match.playerOne}`}>
        <span>{match.round}</span><span className="match-player">{match.playerOne}</span><strong className="match-score">{match.score}</strong><span className="match-player">{match.playerTwo}</span>
      </div>)}</div>
      <p className="live-result-source">Updated from <a href={data.source}>{data.sourceLabel} ↗</a> · Checked {data.checked}</p>
    </section>
  </>;
}
