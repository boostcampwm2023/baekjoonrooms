import { Dispatch, SetStateAction } from 'react';

interface ProblemListProps {
  problemList: string[];
  setProblemList: Dispatch<SetStateAction<string[]>>;
}

export default function ProblemList({
  problemList,
  setProblemList,
}: ProblemListProps) {
  const deleteProblem = (deleteIndex: number) => {
    setProblemList(problemList.filter((_, index) => index !== deleteIndex));
  };

  return (
    <div className="border-aod_gutter m-2 flex h-[250px] w-[250px] flex-col items-center rounded-lg border-2 p-4">
      {problemList.map((problem, index) => (
        <div className="flex w-full justify-between" key={index}>
          <div className="w-[150px] rounded-lg font-semibold">{problem}</div>
          <button
            className="px-2 py-1"
            onClick={() => {
              deleteProblem(index);
            }}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
