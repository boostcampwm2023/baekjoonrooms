/* eslint-disable no-unused-vars */
export interface Score {
  players: PlayerScore[];
}

export interface PlayerScore {
  name: string;
  score: number;
  results: ScoreResult[];
}

export enum ScoreResult {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
  SOLVING = 'SOLVING',
}
