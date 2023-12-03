import { FaChartSimple } from 'react-icons/fa6';
import ScoreBoardModal from '../ScoreBoardModal/ScoreBoardModal';
import { useRef, useState } from 'react';

export default function ScoreboardButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
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
      <button
        className="bg-accent text-default_white flex w-full flex-row items-center justify-center rounded-lg px-3 py-2 hover:opacity-80"
        onClick={openModal}>
        <FaChartSimple />
        <div className="pl-2 font-medium">Scoreboard</div>
      </button>
      {isModalOpen ? (
        <ScoreBoardModal
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
