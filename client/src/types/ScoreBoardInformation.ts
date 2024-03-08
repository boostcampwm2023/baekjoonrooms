import { Submission } from './Submission';
import { Ranking } from './Ranking';

export interface ScoreBoardInformation {
  submissions: Submission[];
  rankings: Ranking[];
}
