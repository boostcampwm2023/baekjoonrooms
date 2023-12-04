import { useState, useRef } from 'react';
import { FaCog } from 'react-icons/fa';

import { ProblemType } from '../types/ProblemType';
import RoomSettingModal from './RoomSettingModal/RoomSettingModal';

export default function Problems({ isHost }: { isHost: boolean }) {
  const [problems, setProblems] = useState<ProblemType[]>([]);
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

  const goSolveProblem = (problemId: number) => () => {
    // open new tab
    window.open(`https://www.acmicpc.net/problem/${problemId}`);
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
                문제를 추가해주세요!
              </h1>
            </div>
          ) : (
            <div className="flex-col">
              {problems.map((problem, index) => (
                <div className="mt-1 flex h-[24px]" key={index}>
                  <div
                    className="h-[24px] max-w-[368px] cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap rounded-[21px] bg-green/20 px-2.5 py-1 text-left text-xs text-green"
                    onClick={goSolveProblem(problem.boj_problem_id!)}>
                    {problem.boj_problem_id}. {problem.title}
                  </div>
                </div>
              ))}
              <div className="absolute top-3 right-3 cursor-pointer"
              onClick={openModal}>
                <FaCog size={32} color={`gray`}/>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[108px] w-full items-center justify-center text-text_default" >
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
        />
      )}
    </>
  );
}
