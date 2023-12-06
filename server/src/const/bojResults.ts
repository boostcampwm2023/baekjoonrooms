export const BojResults = {
  waitings: ['wait', 'compile', 'judging'],
  accepted: ['ac'],
  partiallyAccepteds: ['pa', 'pac'],
  wrongs: ['pe', 'tle', 'mle', 'ole', 'wa', 're', 'rte', 'ce'],
  others: ['rejudge-wait', 'no-judge', 'co', 'del'],
} as const;

export enum Status {
  PENDING = 'PENDING',
  ACCPETED = 'ACCPETED',
  WRONG = 'WRONG',
}
