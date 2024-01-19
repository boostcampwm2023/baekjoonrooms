import { Dispatch, SetStateAction } from 'react';

import { ProblemType } from '../../../types/ProblemType';
import { FaXmark } from 'react-icons/fa6';
import { getProblemButtonColor } from '../../../utils/getProblemButtonColor';
import { goSolveProblem } from '../../../utils/goSolveProblem';

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
    <div className="m-2 flex h-[250px] w-[250px] flex-col items-center rounded-lg border-2 border-gutter p-4">
      {problemList.map((problem, index) => (
        <div
          className="mt-1 flex h-[24px] w-[214px] justify-between"
          key={index}>
          <div
            className={`flex max-w-[174px] cursor-pointer items-center justify-center gap-2 rounded-[21px] px-2.5 py-1 text-left text-xs ${getProblemButtonColor(
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
          <button
            className="text-text_default"
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
