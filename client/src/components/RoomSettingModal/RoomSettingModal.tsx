import { RefObject, useState, Dispatch, SetStateAction } from 'react';

import SelectProblem from './SelectProblem';
import RandomProblem from './RandomProblem';
import ProblemList from './ProblemList';
import { FaXmark } from 'react-icons/fa6';
import { FaToggleOff } from 'react-icons/fa6';
import { FaToggleOn } from 'react-icons/fa6';
import Dropdown from '../Dropdown';
import { ProblemType } from '../../types/ProblemType';

interface RoomSettingModalProps {
  modalOverlayRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
  modalOutsideClick: (arg: React.MouseEvent<HTMLDivElement>) => void;
  problems: ProblemType[];
  setProblems: Dispatch<SetStateAction<ProblemType[]>>;
}

const iconStyle = {
  fontSize: '1.5rem',
};

export default function RoomSettingModal({
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
  problems,
  setProblems,
}: RoomSettingModalProps) {
  const [problem, setProblem] = useState<ProblemType>({
    title: '',
    boj_problem_id: undefined,
    url: '',
    level: undefined,
    tag: [],
  });
  const [problemList, setProblemList] = useState<ProblemType[]>(problems);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [time, setTime] = useState<number>(15);

  const toggleType = () => {
    setIsRandom(!isRandom);
  };

  const settingComplete = () => {
    const numberList = problemList.map((problem)=>problem.boj_problem_id);
    const duplicated = numberList.some(
      (item) => numberList.indexOf(item) !== numberList.lastIndexOf(item),
    );
    if (duplicated) {
      alert('중복된 문제가 있습니다.');
      return;
    }
    setProblems(problemList);
    closeModal();
  };

  return (
    <div
      className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-bg/80"
      style={{ backdropFilter: 'blur(10px)' }}
      ref={modalOverlayRef}
      onClick={modalOutsideClick}>
      <div className="z-100 relative flex h-[430px] w-[330px] flex-col items-center rounded-lg bg-bg">
        <div className="relative mb-2 mt-4 flex w-full justify-center gap-2 align-middle text-lg font-semibold text-text_default">
          {isRandom ? <p>랜덤으로 출제</p> : <p>번호로 출제</p>}
          <div className="absolute right-8 top-1/2 flex -translate-y-1/2 transform gap-2">
            <button onClick={toggleType}>
              {isRandom ? (
                <FaToggleOff style={iconStyle} />
              ) : (
                <FaToggleOn style={iconStyle} />
              )}
            </button>
            <button className="" onClick={closeModal}>
              <FaXmark style={iconStyle} />
            </button>
          </div>
        </div>

        {isRandom ? (
          <RandomProblem
            problemList={problemList}
            setProblemList={setProblemList}
          />
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
          <Dropdown
            options={[15, 30, 45]}
            optionPostFix="분"
            selected={time}
            setSelected={setTime}
            buttonClassName="rounded-lg border border-gutter bg-default_white px-5 py-1 text-sm text-default_black"
            itemBoxClassName="border border-gutter rounded-lg"
            itemClassName="hover:opacity-80 bg-fg text-sm text-text_default py-1 odd:bg-gutter"
          />
          <button
            className="rounded-lg bg-accent px-5 py-1 text-sm text-default_white hover:opacity-80"
            onClick={settingComplete}>
            설정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
