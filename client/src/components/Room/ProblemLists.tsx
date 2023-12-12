import { ProblemType } from '../../types/ProblemType';
import { getProblemButtonColor } from '../../utils/getProblemButtonColor';
import { goSolveProblem } from '../../utils/goSolveProblem';

export default function ProblemLists({
  problems,
}: {
  problems: ProblemType[];
}) {
  return (
    <div className="flex-col">
      {problems.map((problem, index) => (
        <div className="mt-1 flex h-[24px]" key={index}>
          <div
            className={`flex h-[24px] max-w-[368px] cursor-pointer items-center justify-center gap-2  rounded-[21px] px-2.5 py-1 text-left text-xs ${getProblemButtonColor(
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
        </div>
      ))}
    </div>
  );
}
