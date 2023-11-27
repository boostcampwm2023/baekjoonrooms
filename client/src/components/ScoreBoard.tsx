import AcceptedSubmissionIcon from '../icons/AcceptedSubmissionIcon';
import GraphIcon from '../icons/GraphIcon';
import { PlayerScoreType, ResultType, ScoreType } from '../types/ScoreType';
import mockScoresData from '../../public/mocks/Scores.json';

const mockScores: ScoreType = {
  players: mockScoresData.players.map((player) => ({
    ...player,
    results: player.results.map(
      (result) => ResultType[result as keyof typeof ResultType],
    ),
  })),
};

export default function ScoreBoardModal() {
  return (
    <div className="flex h-[430px] w-[330px] flex-col items-center rounded-2xl bg-aod_bg">
      <div className="flex w-full flex-col items-center gap-y-[2px] border-b-[0.5px] border-aod_gutter px-5 py-3">
        <div className="flex flex-row items-baseline gap-2">
          <GraphIcon />
          <div className="text-lg font-medium text-aod_text">Scoreboard</div>
        </div>
        <div className="text-xs text-aod_text">3 online</div>
      </div>

      <ScoreBoard scores={mockScores}></ScoreBoard>
    </div>
  );
}

interface ScoreBoardProps {
  scores: ScoreType;
}

export function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <ul className="my-5 flex w-full flex-col overflow-auto text-sm font-medium text-aod_text">
      {scores.players.map((playerScore, index) => (
        <Players key={index} playerScore={playerScore} />
      ))}
    </ul>
  );
}

interface PlayersProps {
  playerScore: PlayerScoreType;
}

export function Players({ playerScore }: PlayersProps) {
  return (
    <li className="flex flex-row gap-3 bg-aod_bg px-5 py-2.5 text-aod_text odd:bg-aod_text_alt odd:text-aod_gutter">
      <div>{playerScore.name}</div>
      <div className="flex w-full flex-row gap-1">
        {playerScore.results.map((result, index) => (
          <Result key={index} result={result} />
        ))}
      </div>
    </li>
  );
}

interface ResultProps {
  result: ResultType;
}

export function Result({ result }: ResultProps) {
  return (
    <div className="flex flex-1 flex-row justify-around">
      {result === ResultType.CORRECT ? (
        <AcceptedSubmissionIcon />
      ) : result === ResultType.WRONG ? (
        <AcceptedSubmissionIcon />
      ) : (
        <AcceptedSubmissionIcon />
      )}
    </div>
  );
}
