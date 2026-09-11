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
  upcoming: ScheduledMatch[];
};

// A small, explicitly dated editorial snapshot for active events. This is the
// temporary update path until an authorised data feed is available. Only
// confirmed information from the linked source belongs in this file.
export const tournamentUpdates: Record<string, TournamentUpdate> = {
  'english-open-2026': {
    checked: '11 September 2026 · 10:00 UTC+8',
    source: 'https://www.snooker.org/res/index.asp?event=2546',
    sourceLabel: 'Snooker.org · BetVictor English Open',
    status: 'Quarter-final day',
    summary:
      'The Last 16 is complete and the four quarter-finals are confirmed in this manually checked snapshot.',
    verifiedResults: [
      { round: 'Last 16', playerOne: 'Ding Junhui', score: '4–1', playerTwo: 'Joe O’Connor' },
      { round: 'Last 16', playerOne: 'Kyren Wilson', score: '4–3', playerTwo: 'Mark Selby' },
      { round: 'Last 16', playerOne: 'Zhou Yuelong', score: '4–2', playerTwo: 'Yuan Sijun' },
      { round: 'Last 16', playerOne: 'Ali Carter', score: '4–2', playerTwo: 'Gong Chenzhi' },
      { round: 'Last 16', playerOne: 'Judd Trump', score: '4–3', playerTwo: 'Anthony McGill' },
      { round: 'Last 16', playerOne: 'Shaun Murphy', score: '4–3', playerTwo: 'Pang Junxu' },
      { round: 'Last 16', playerOne: 'Mark J Williams', score: '4–1', playerTwo: 'Barry Hawkins' },
      { round: 'Last 16', playerOne: 'Liam Davies', score: '4–1', playerTwo: 'Wu Yize' },
    ],
    upcoming: [
      { round: 'Quarter-final', playerOne: 'Ding Junhui', playerTwo: 'Kyren Wilson', timing: '11 September · 12:00 UTC' },
      { round: 'Quarter-final', playerOne: 'Zhou Yuelong', playerTwo: 'Ali Carter', timing: '11 September · 12:00 UTC' },
      { round: 'Quarter-final', playerOne: 'Judd Trump', playerTwo: 'Shaun Murphy', timing: '11 September · 18:00 UTC' },
      { round: 'Quarter-final', playerOne: 'Mark J Williams', playerTwo: 'Liam Davies', timing: '11 September · 18:00 UTC' },
    ],
  },
};
