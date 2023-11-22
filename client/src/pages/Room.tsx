import { useState } from 'react';
import CreateRoom from '../../public/mocks/CreateRoom.json';
import problems from '../../public/mocks/UpdateRoom.json';
import { ProblemType } from '../types/ProblemType';

export default function Room() {
  const [timer, setTimer] = useState("Start");

  const start = () => {
    setTimer("0:00:00");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400/50 to-blue-500/50">
      <div className="flex w-[322px] flex-col items-center justify-center gap-4 rounded-xl border-8 border-gray-200 px-6 py-10">
        <div className="flex w-full items-center justify-between py-2.5">
          <div className="flex flex-row items-center rounded-lg bg-gray-300/50 p-2">
            <div className="pr-3 text-xl font-bold">{CreateRoom.code}</div>
            <button className="rounded bg-transparent p-1 hover:bg-gray-200">
              <img src="../assets/copy.png" alt="copy" className="h-6 w-auto" />
            </button>
          </div>
          <button className="flex flex-row items-center gap-x-2 rounded-lg bg-gray-300/50 p-2 hover:bg-red-300/50 hover:text-red-600">
            <img src="../assets/exit.png" alt="exit" className="h-6 w-auto" />
            <div className="text-xl font-semibold">Exit</div>
          </button>
        </div>
        <Problems problems={problems.problems} />
        <button className="m-1 flex w-full flex-row items-center justify-center rounded-[21px] bg-gray-300/50 p-1 hover:bg-green-300/50 hover:text-green-600">
          <div>Scoreboard</div>
        </button>
        <Chat />
        <div className="flex w-full justify-end">
          <button className="m-1 w-[150px] flex flex-row items-center justify-center rounded bg-gray-300/50 p-1 hover:bg-green-300/50 hover:text-green-600"
          onClick={start}
          >
            {timer}
          </button>
        </div>
      </div>
    </div>
  );
}

type ProblemProps = {
  problems: ProblemType[];
};

function Problems({ problems }: ProblemProps) {
  return (
    <ul>
      {problems.map((problem) => (
        <li key={problem.boj_problem_id}>
          <button className="m-1 flex w-full flex-row rounded-[21px] bg-gray-300/50 p-1">
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
      ))}
    </ul>
  );
}

function Chat() {
  return (
    <div className="h-[250px] w-full rounded border-2 border-gray-900">
      Chat
    </div>
  );
}
