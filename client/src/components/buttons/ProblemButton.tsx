import { ProblemType } from '../../types/ProblemType';

export function ProblemButton(problem: ProblemType) {
  return (
    <li>
      {/* 문제 난이도에 따라 다른 배경색 적용 */}
      <button className="w-fit rounded-[21px] bg-aod_green/75 px-2.5 py-1 text-left text-xs">
        {problem.boj_problem_id + '. ' + problem.title}
      </button>
    </li>
  );
}
