/* eslint-disable no-unused-vars */
export interface ScoreType {
  players: PlayerScoreType[];
}

export interface PlayerScoreType {
  name: string;
  score: number;
  results: ResultType[];
}

export enum ResultType {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
  SOLVING = 'SOLVING',
}
