import { Dispatch, SetStateAction } from 'react';

import { ProblemType } from '../../types/ProblemType';
import { FaXmark } from 'react-icons/fa6';

interface ProblemListProps {
  problemList: ProblemType[];
  setProblemList: Dispatch<SetStateAction<ProblemType[]>>;
}

const iconStyle = {
  fontSize: '1.5rem',
};

export default function ProblemList({
  problemList,
  setProblemList,
}: ProblemListProps) {
  const deleteProblem = (deleteIndex: number) => {
    setProblemList(problemList.filter((_, index) => index !== deleteIndex));
  };

  return (
    <div className="border-gutter m-2 flex h-[250px] w-[250px] flex-col items-center rounded-lg border-2 p-4">
      {problemList.map((problem, index) => (
        <div
          className="mt-1 flex h-[24px] w-[214px] justify-between"
          key={index}>
          <div className="max-w-[174px] overflow-hidden overflow-ellipsis whitespace-nowrap rounded-[21px] bg-aod_green/20 px-2.5 py-1 text-left text-xs text-aod_green">
            {problem.title}
          </div>
          <button
            className="text-aod_text"
            onClick={() => {
              deleteProblem(index);
            }}>
            <FaXmark style={iconStyle} />
          </button>
        </div>
      ))}
    </div>
  );
}
