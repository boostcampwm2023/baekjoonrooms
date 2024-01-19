import { FaChartSimple } from 'react-icons/fa6';
import ScoreBoardModal from '../Room/ScoreBoardModal/ScoreBoardModal';
import { useRef, useState } from 'react';
import { getScores } from '../../apis/scores';
import { useRoom } from '../../hooks/useRoom';
import { Score } from '../../types/Score';

export default function ScoreboardButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scores , setScores] = useState<Score[]>([]);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const {roomCode,roomInfo} = useRoom();

  const openModal = async () => {
    try {
      const res = await getScores(roomCode);
      setScores(res);
    } catch (e) {
      console.log(e);
      alert('Error getting scores');
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalOverlayRef.current === event.target) {
      setIsModalOpen(false);
    }
  };
  return (
    <>
    {roomInfo.isStarted ? (
      <button
        className="flex w-full flex-row items-center justify-center rounded-lg bg-accent px-3 py-2 text-default_white hover:opacity-80"
        onClick={openModal}>
        <FaChartSimple />
        <div className="pl-2 font-medium">Scoreboard</div>
      </button>
    ) : (
      <></>
    )}
      {isModalOpen ? (
        <ScoreBoardModal
          scores={scores}
          modalOverlayRef={modalOverlayRef}
          closeModal={closeModal}
          modalOutsideClick={modalOutsideClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}
