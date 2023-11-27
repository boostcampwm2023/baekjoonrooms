import { useState } from 'react';

import { ProblemType } from '../../types/ProblemType';
import RoomSettingModal from '../RoomSettingModal/RoomSettingModal';

export function ProblemButton(problem: ProblemType) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li>
        {/* 문제 난이도에 따라 다른 배경색 적용 */}
        <button
          className="bg-aod_green/75 w-fit rounded-[21px] px-2.5 py-1 text-left text-xs"
          onClick={openModal}>
          {problem.boj_problem_id + '. ' + problem.title}
        </button>
      </li>
      {isModalOpen && <RoomSettingModal closeModal={closeModal} />}
    </>
  );
}
