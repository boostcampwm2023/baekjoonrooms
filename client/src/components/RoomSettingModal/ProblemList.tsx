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

  const goSolveProblem = (problemId: number) => () => {
    // open new tab
    window.open(`https://www.acmicpc.net/problem/${problemId}`);
  }

  return (
    <div className="m-2 flex h-[250px] w-[250px] flex-col items-center rounded-lg border-2 border-gutter p-4">
      {problemList.map((problem, index) => (
        <div
          className="mt-1 flex h-[24px] w-[214px] justify-between"
          key={index}>
          <div className="bg-green/20 max-w-[174px] overflow-hidden overflow-ellipsis whitespace-nowrap rounded-[21px] px-2.5 py-1 text-left text-xs text-green cursor-pointer"
          onClick={goSolveProblem(problem.boj_problem_id!)}>
            {problem.boj_problem_id}. {problem.title}
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