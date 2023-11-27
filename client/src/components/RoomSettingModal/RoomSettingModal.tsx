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
      className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-aod_bg/80"
      style={{ backdropFilter: 'blur(10px)' }}
      ref={modalOverlayRef}
      onClick={modalOutsideClick}>
      <div className="z-100 relative flex h-[430px] w-[330px] flex-col items-center rounded-lg bg-aod_bg">
        <div className="relative mb-2 mt-4 flex w-full justify-center gap-2 align-middle text-lg font-semibold text-aod_text">
          {isRandom ? <p>랜덤으로 출제</p> : <p>번호로 출제</p>}
          <div className="absolute right-8 top-1/2 flex -translate-y-1/2 transform gap-2">
            <button onClick={toggleType}>
              {isRandom ? (
                <FaToggleOff
                  style={{
                    fontSize: '1.5rem',
                  }}
                />
              ) : (
                <FaToggleOn
                  style={{
                    fontSize: '1.5rem',
                  }}
                />
              )}
            </button>
            <button className="" onClick={closeModal}>
              <FaXmark
                style={{
                  fontSize: '1.5rem',
                }}
              />
            </button>
          </div>
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
