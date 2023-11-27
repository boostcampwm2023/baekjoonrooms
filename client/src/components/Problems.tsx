import { ProblemType } from '../types/ProblemType';
import { ProblemButton } from './buttons/ProblemButton';
import mockData from '../../public/mocks/UpdateRoom.json';
import { useState } from 'react';

export default function Problems({ isHost }: { isHost: boolean }) {
  // TODO: socket연결 후 수정
  const [problems, setProblems] = useState<ProblemType[]>([]);
  return (
    <>
      {isHost && problems.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">문제를 추가해주세요!</h1>
          <button
            className="text-white bg-aod_pink mt-4 rounded-lg px-4 py-2"
            onClick={() => setProblems(mockData.problems)}>
            문제 추가
          </button>
        </div>
      )}

      <ul className="flex w-full flex-col">
        {problems.map((problem) => (
          <ProblemButton key={problem.boj_problem_id} {...problem} />
        ))}
      </ul>
    </>
  );
}
