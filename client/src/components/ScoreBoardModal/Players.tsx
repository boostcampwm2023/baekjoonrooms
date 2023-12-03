import { PlayerScore } from '../../types/ScoreType';
import Result from './Result';

interface PlayersProps {
  playerScore: PlayerScore;
}

export default function Players({ playerScore }: PlayersProps) {
  return (
    <li className="odd:bg-guide bg-bg odd:text-gutter text-text_default flex flex-row px-5 py-2.5">
      <div>{playerScore.name}</div>
      <div className="flex w-full flex-row gap-1">
        {playerScore.results.map((result, index) => (
          <Result key={index} result={result} />
        ))}
      </div>
    </li>
  );
}
