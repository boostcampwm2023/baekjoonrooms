import { useState, useRef } from 'react';
import { FaPencil } from 'react-icons/fa6';

import RoomSettingModal from './RoomSettingModal/RoomSettingModal';
import { useTheme } from '../../hooks/useTheme';
import { getProblemButtonColor } from '../../util/getProblemButtonColor';
import { goSolveProblem } from '../../util/goSolveProblem';
import { useRoom } from '../../hooks/useRoom';

export default function Problems() {
  const { isHost, problems, setProblems, duration, setDuration } = useRoom();
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

  return (
    <>
      {isHost ? (
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
            <div className="flex-col">
              {problems.map((problem, index) => (
                <div className="mt-1 flex h-[24px]" key={index}>
                  <div
                    className={`flex h-[24px] max-w-[368px] cursor-pointer items-center justify-center gap-2  rounded-[21px] px-2.5 py-1 text-left text-xs ${getProblemButtonColor(
                      problem.level,
                    )}`}
                    onClick={goSolveProblem(problem)}>
                    <img
                      className="h-[12px] w-[12px]"
                      src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
                      alt={`${problem.level}`}
                    />
                    <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {problem.bojProblemId}. {problem.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
      ) : (
        <div className="flex h-[108px] w-full items-center justify-center text-text_default">
          문제 출제중...
        </div>
      )}
      {isModalOpen && (
        <RoomSettingModal
          modalOverlayRef={modalOverlayRef}
          closeModal={closeModal}
          modalOutsideClick={modalOutsideClick}
          problems={problems}
          setProblems={setProblems}
          duration={duration}
          setDuration={setDuration}
        />
      )}
    </>
  );
}
