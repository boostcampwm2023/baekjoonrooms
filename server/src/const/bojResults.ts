export const BojResults = {
  waitings: ['wait', 'compile', 'judging'],
  accepted: ['ac'],
  partiallyAccepteds: ['pa', 'pac'],
  wrongs: ['pe', 'tle', 'mle', 'ole', 'wa', 're', 'rte', 'ce'],
  others: ['rejudge-wait', 'no-judge', 'co', 'del'],
} as const;

export enum Status {
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  WRONG = 'WRONG',
}

export const BojResultsToStatus = {
  wait: Status.WAITING,
  compile: Status.WAITING,
  judging: Status.WAITING,
  ac: Status.ACCEPTED,
  pa: Status.WRONG,
  pac: Status.WRONG,
  pe: Status.WRONG,
  tle: Status.WRONG,
  mle: Status.WRONG,
  ole: Status.WRONG,
  wa: Status.WRONG,
  re: Status.WRONG,
  rte: Status.WRONG,
  ce: Status.WRONG,
  'rejudge-wait': Status.WRONG,
  'no-judge': Status.WRONG,
  co: Status.WRONG,
  del: Status.WRONG,
};
