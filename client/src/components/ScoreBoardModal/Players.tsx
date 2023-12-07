import { PlayerScore } from '../../types/ScoreType';
import Result from './Result';

interface PlayersProps {
  playerScore: PlayerScore;
}

export default function Players({ playerScore }: PlayersProps) {
  return (
    <li className="flex flex-row bg-bg odd:bg-bg_secondary px-5 py-2.5 text-text_default">
      <div>{playerScore.name}</div>
      <div className="flex w-full flex-row gap-1">
        {playerScore.results.map((result, index) => (
          <Result key={index} result={result} />
        ))}
      </div>
    </li>
  );
}
