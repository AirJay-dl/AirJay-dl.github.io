export type VerifiedMatch = {
  round: string;
  playerOne: string;
  score: string;
  playerTwo: string;
};

export type ScheduledMatch = {
  round: string;
  playerOne: string;
  playerTwo: string;
  timing: string;
};

export type TournamentUpdate = {
  checked: string;
  source: string;
  sourceLabel: string;
  status: string;
  summary: string;
  verifiedResults: VerifiedMatch[];
  liveMatches?: VerifiedMatch[];
  upcoming: ScheduledMatch[];
};

// A small, explicitly dated editorial snapshot for active events. This is the
// temporary update path until an authorised data feed is available. Only
// confirmed information from the linked source belongs in this file.
export const tournamentUpdates: Record<string, TournamentUpdate> = {
  'english-open-2026': {
    checked: '12 September 2026 · 23:08 UTC+8',
    source: 'https://www.snooker.org/res/index.asp?event=2546',
    sourceLabel: 'Snooker.org · BetVictor English Open',
    status: 'Semi-finals',
    summary:
      'Ali Carter is through to the final after beating Ding Junhui 6–2. Shaun Murphy and Mark J Williams contest the second semi-final.',
    verifiedResults: [
      { round: 'Semi-final', playerOne: 'Ali Carter', score: '6–2', playerTwo: 'Ding Junhui' },
      { round: 'Quarter-final', playerOne: 'Ding Junhui', score: '6–2', playerTwo: 'Kyren Wilson' },
      { round: 'Quarter-final', playerOne: 'Ali Carter', score: '6–5', playerTwo: 'Zhou Yuelong' },
      { round: 'Quarter-final', playerOne: 'Shaun Murphy', score: '6–5', playerTwo: 'Judd Trump' },
      { round: 'Quarter-final', playerOne: 'Mark J Williams', score: '6–3', playerTwo: 'Liam Davies' },
    ],
    upcoming: [
      { round: 'Semi-final', playerOne: 'Shaun Murphy', playerTwo: 'Mark J Williams', timing: '12 September · 18:00 UTC' },
      { round: 'Final', playerOne: 'Ali Carter', playerTwo: 'Murphy / Williams winner', timing: '13 September · 12:00 & 18:00 UTC' },
    ],
  },
};
