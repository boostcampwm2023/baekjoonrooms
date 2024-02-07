export interface Ranking {
  id: number;
  username: string;
  numberOfProblemsSolved: number;
  mostRecentCorrectSubmissionTime: string | null; // is nullable?
}