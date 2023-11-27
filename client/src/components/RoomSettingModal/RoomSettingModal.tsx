import { RefObject, useState } from 'react';

import SelectProblem from './SelectProblem';
import RandomProblem from './RandomProblem';
import ProblemList from './ProblemList';
import { FaXmark } from 'react-icons/fa6';
import { FaToggleOff } from 'react-icons/fa6';
import { FaToggleOn } from 'react-icons/fa6';

interface RoomSettingModalProps {
  modalOverlayRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  modalOutsideClick: (arg: React.MouseEvent<HTMLDivElement>) => void;
}

export default function RoomSettingModal({
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
}: RoomSettingModalProps) {
  const [problem, setProblem] = useState('');
  const [problemList, setProblemList] = useState<string[]>([]);
  const [isRandom, setIsRandom] = useState<boolean>(false);

  const toggleType = () => {
    setIsRandom(!isRandom);
  };

  return (
    <div
      className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[rgb(0,0,0,0.5)]"
      ref={modalOverlayRef}
      onClick={modalOutsideClick}>
      <div className="z-100 relative flex h-[430px] w-[330px] flex-col items-center bg-aod_fg">
        <button className="absolute right-3 top-3" onClick={closeModal}>
          <FaXmark />
        </button>
        <div className="mb-2 mt-4 flex gap-2 text-lg font-semibold text-aod_text">
          {isRandom ? (
            <div>
              <p>랜덤으로 출제</p>
              <button onClick={toggleType}>
                <FaToggleOff />
              </button>
            </div>
          ) : (
            <div>
              <p>번호로 출제</p>
              <button onClick={toggleType}>
                <FaToggleOn />
              </button>
            </div>
          )}
        </div>
        {isRandom ? (
          <RandomProblem />
        ) : (
          <SelectProblem
            problem={problem}
            setProblem={setProblem}
            problemList={problemList}
            setProblemList={setProblemList}
          />
        )}
        <ProblemList
          problemList={problemList}
          setProblemList={setProblemList}
        />
        <div className="m-2 flex w-[250px] justify-between">
          <select className="bg-gray-200 rounded-lg px-2 py-1">
            <option value="15분">15분</option>
            <option value="15분">30분</option>
            <option value="15분">45분</option>
            <option value="15분">60분</option>
            <option value="15분">90분</option>
            <option value="15분">120분</option>
            <option value="15분">무제한</option>
          </select>
          <button className="hover:bg-gray-600 rounded-lg bg-aod_accent px-5 py-1 text-sm text-aod_white">
            설정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
