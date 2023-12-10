import { Score } from '../../../types/ScoreType';
import Players from './Players';

interface ScoreBoardProps {
  scores: Score;
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <ul className="my-5 flex w-full flex-col overflow-auto text-sm font-medium text-text_default">
      {scores.players.map((playerScore, index) => (
        <Players key={index} playerScore={playerScore} />
      ))}
    </ul>
  );
}
