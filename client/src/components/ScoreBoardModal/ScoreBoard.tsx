import { ScoreType } from '../../types/ScoreType';
import Players from './Players';

interface ScoreBoardProps {
  scores: ScoreType;
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <ul className="my-5 flex w-full flex-col overflow-auto text-sm font-medium text-aod_text">
      {scores.players.map((playerScore, index) => (
        <Players key={index} playerScore={playerScore} />
      ))}
    </ul>
  );
}
