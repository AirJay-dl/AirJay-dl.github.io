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
    checked: '11 September 2026',
    source: 'https://www.snooker.org/res/index.asp?event=2546',
    sourceLabel: 'Snooker.org · BetVictor English Open',
    status: 'Quarter-final day',
    summary:
      'The English Open is in its Last 16 and quarter-final phase. Kyren Wilson and Zhou Yuelong have confirmed their places in the quarter-finals in this manually checked snapshot.',
    verifiedResults: [
      { round: 'Last 16', playerOne: 'Kyren Wilson', score: '4–3', playerTwo: 'Mark Selby' },
      { round: 'Last 16', playerOne: 'Zhou Yuelong', score: '4–2', playerTwo: 'Yuan Sijun' },
      { round: 'Last 32', playerOne: 'Ding Junhui', score: '4–2', playerTwo: 'Ashley Hugill' },
      { round: 'Last 32', playerOne: 'Wu Yize', score: '4–2', playerTwo: 'Xu Si' },
    ],
    upcoming: [
      { round: 'Quarter-final', playerOne: 'Joe O’Connor or Ding Junhui', playerTwo: 'Kyren Wilson', timing: 'Friday 11 September' },
      { round: 'Quarter-final', playerOne: 'Zhou Yuelong', playerTwo: 'Ali Carter or Gong Chenzhi', timing: 'Friday 11 September' },
      { round: 'Quarter-final', playerOne: 'Judd Trump or Anthony McGill', playerTwo: 'Pang Junxu or Shaun Murphy', timing: 'Friday 11 September' },
      { round: 'Quarter-final', playerOne: 'Mark J Williams or Barry Hawkins', playerTwo: 'Liam Davies or Wu Yize', timing: 'Friday 11 September' },
    ],
  },
};
