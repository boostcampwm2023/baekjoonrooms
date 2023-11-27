import { RefObject, useState } from 'react';

import SelectProblem from './SelectProblem';
import RandomProblem from './RandomProblem';
import ProblemList from './ProblemList';
import XIcon from '../../icons/XIcon';
import ToggleIcon from '../../icons/ToggleIcon';

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

  const togleType = () => {
    setIsRandom(!isRandom);
  };

  return (
    <div
      className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[rgb(0,0,0,0.5)]"
      ref={modalOverlayRef}
      onClick={modalOutsideClick}>
      <div className="bg-aod_fg z-100 relative flex h-[430px] w-[330px] flex-col items-center">
        <button className="absolute right-3 top-3" onClick={closeModal}>
          <XIcon />
        </button>
        <div className="text-aod_text mb-2 mt-4 flex gap-2 text-lg font-semibold">
          {isRandom ? '랜덤 출제' : '번호로 출제'}
          <button onClick={togleType}>
            <ToggleIcon />
          </button>
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
          <select className="rounded-lg bg-gray-200 px-2 py-1">
            <option value="15분">15분</option>
            <option value="15분">30분</option>
            <option value="15분">45분</option>
            <option value="15분">60분</option>
            <option value="15분">90분</option>
            <option value="15분">120분</option>
            <option value="15분">무제한</option>
          </select>
          <button className="bg-aod_accent text-aod_white rounded-lg px-5 py-1 text-sm hover:bg-gray-600">
            설정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
