import { Score } from '../../types/ScoreType';
import Players from './Players';

interface ScoreBoardProps {
  scores: Score;
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <ul className="text-text_default my-5 flex w-full flex-col overflow-auto text-sm font-medium">
      {scores.players.map((playerScore, index) => (
        <Players key={index} playerScore={playerScore} />
      ))}
    </ul>
  );
}
