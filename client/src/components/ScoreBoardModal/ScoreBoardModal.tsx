import { ScoreResult, Score } from '../../types/ScoreType';
import mockScoresData from '../../../public/mocks/Scores.json';
import ScoreBoard from './ScoreBoard';
import { FaChartSimple, FaXmark } from 'react-icons/fa6';
import { RefObject } from 'react';

interface ModalProps {
  modalOverlayRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  modalOutsideClick: (arg: React.MouseEvent<HTMLDivElement>) => void;
}

const mockScores: Score = {
  players: mockScoresData.players.map((player) => ({
    ...player,
    results: player.results.map(
      (result) => ScoreResult[result as keyof typeof ScoreResult],
    ),
  })),
};

const iconStyle = {
  fontSize: '1.5rem',
};

export default function ScoreBoardModal({
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
}: ModalProps) {
  return (
    <div
      className="bg-bg/80 absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center"
      style={{ backdropFilter: 'blur(10px)' }}
      ref={modalOverlayRef}
      onClick={modalOutsideClick}>
      <div className="bg-bg border-gutter relative flex h-[430px] w-[330px] flex-col items-center rounded-2xl border-[0.5px]">
        <button className="absolute right-4 top-4" onClick={closeModal}>
          <FaXmark style={iconStyle} />
        </button>
        <div className="border-gutter flex w-full flex-col items-center gap-y-[2px] border-b-[0.5px] px-5 py-3">
          <div className="flex flex-row items-baseline gap-2">
            <FaChartSimple />
            <div className="text-text_default text-lg font-medium">
              Scoreboard
            </div>
          </div>
          <div className="text-text_default text-xs">3 online</div>
        </div>
        <ScoreBoard scores={mockScores}></ScoreBoard>
      </div>
    </div>
  );
}
