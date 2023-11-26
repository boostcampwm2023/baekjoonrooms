import { ProblemType } from '../../types/ProblemType';

export function ProblemButton(problem: ProblemType) {
  return (
    <li>
      <button className="bg-gray-300/50 m-1 flex w-full flex-row rounded-[21px] p-1">
        <img
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLOhmC%2Fbtrtyd4HWM8%2FolsHRonfM8UnTzjl0kE960%2Fimg.png"
          className="w-4"
        />
        <div className="px-2 text-xs font-semibold">
          {problem.boj_problem_id}
        </div>
        <div className="px-2 text-xs font-semibold">{problem.title}</div>
      </button>
    </li>
  );
}
