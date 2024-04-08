import { useState, useRef } from 'react';
import { FaPencil } from 'react-icons/fa6';

import RoomSettingModal from './RoomSettingModal/RoomSettingModal';
import { useTheme } from '../../../hooks/useTheme';
import ProblemLists from './ProblemLists';
import { useRoomStore } from '../../../store/roomStore';

export default function Problems() {
  const { isHost, roomInfo, problems } = useRoomStore();
  const { theme } = useTheme();

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

  if (isHost && !roomInfo.isStarted) {
    return (
      <>
        <div className="relative h-[120px] w-full">
          {problems.length === 0 ? (
            <div
              className="flex h-full w-full cursor-pointer items-center justify-center"
              onClick={openModal}>
              <h1 className="text-2xl font-bold text-text_default">
                연필 버튼을 눌러 문제를 추가해주세요!
              </h1>
            </div>
          ) : (
            <ProblemLists problems={problems} />
          )}
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={openModal}>
            <FaPencil
              size={32}
              color={`${theme.includes('dark') ? 'white' : 'black'}`}
            />
          </div>
        </div>
        {isModalOpen && (
          <RoomSettingModal
            modalOverlayRef={modalOverlayRef}
            closeModal={closeModal}
            modalOutsideClick={modalOutsideClick}
          />
        )}
      </>
    );
  }

  if (isHost && roomInfo.isStarted) {
    return (
      <div className="relative h-[120px] w-full">
        <ProblemLists problems={problems} />
      </div>
    );
  }

  if (!isHost && !roomInfo.isStarted) {
    return (
      <div className="flex h-[108px] w-full items-center justify-center text-text_default">
        문제 출제중...
      </div>
    );
  }

  if (!isHost && roomInfo.isStarted) {
    return (
      <div className="relative h-[120px] w-full">
        <ProblemLists problems={problems} />
      </div>
    );
  }
}
