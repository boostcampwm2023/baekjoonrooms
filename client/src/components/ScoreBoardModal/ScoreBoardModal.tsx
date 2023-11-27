import { ResultType, ScoreType } from '../../types/ScoreType';
import mockScoresData from '../../../public/mocks/Scores.json';
import { ScoreBoard } from './ScoreBoard';
import { FaChartSimple } from 'react-icons/fa6';


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
          <FaChartSimple />
          <div className="text-lg font-medium text-aod_text">Scoreboard</div>
        </div>
        <div className="text-xs text-aod_text">3 online</div>
      </div>

      <ScoreBoard scores={mockScores}></ScoreBoard>
    </div>
  );
}


