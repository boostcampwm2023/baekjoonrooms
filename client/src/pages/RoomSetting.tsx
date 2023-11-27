import { useState } from 'react';

import ToggleIcon from '../icons/ToggleIcon';

export default function RoomSetting() {
  const [problem, setProblem] = useState('');
  const [problemList, setProblemList] = useState<string[]>([]);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(event.target.value);
  };
  const registerProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProblemList([...problemList, problem]);
    setProblem('');
  };
  const deleteProblem = (deleteIndex: number) => {
    setProblemList(problemList.filter((_, index) => index !== deleteIndex));
  };

  const togleType = () => {
    setIsRandom(!isRandom);
  };

  function SelectProblem() {
    return (
      <form
        className="m-2 flex w-[250px] justify-between"
        onSubmit={registerProblem}>
        <input
          className="bg-aod_white rounded-lg px-2"
          placeholder="문제를 입력하시오"
          value={problem}
          onChange={onChangeInput}
        />
        <button className="bg-aod_accent text-aod_white rounded-lg px-3 py-1 text-sm hover:opacity-80">
          등록
        </button>
      </form>
    );
  }

  function RandomProblem() {
    return (
      <form className="m-2 flex w-[250px] justify-between">
        <select className="bg-aod_white rounded-lg px-1">
          <option value="B5">B5</option>
          <option value="S5">S5</option>
          <option value="G5">G5</option>
          <option value="P5">P5</option>
          <option value="D5">D5</option>
          <option value="R5">R5</option>
        </select>
        <select className="bg-aod_white rounded-lg px-1">
          <option value="bfs,dfs">bfs,dfs</option>
        </select>
        <select className="bg-aod_white rounded-lg px-1">
          <option value="1개">1개</option>
          <option value="2개">2개</option>
          <option value="3개">3개</option>
          <option value="4개">4개</option>
          <option value="5개">5개</option>
        </select>
        <button className="bg-aod_accent text-aod_white rounded-lg px-3 py-1 text-sm hover:bg-gray-600">
          등록
        </button>
      </form>
    );
  }

  return (
    <>
      <div className="bg-aod_fg flex h-[430px] w-[330px] flex-col items-center">
        <div className="text-aod_text mb-2 mt-4 flex gap-2 text-lg font-semibold">
          {isRandom ? '랜덤 출제' : '번호로 출제'}
          <button onClick={togleType}>
            <ToggleIcon />
          </button>
        </div>
        {isRandom ? <RandomProblem /> : <SelectProblem />}
        <div className="border-aod_black m-2 flex h-[250px] w-[250px] flex-col items-center rounded-lg border-2 p-4">
          {problemList.map((problem, index) => (
            <div className="flex w-full justify-between" key={index}>
              <div className="w-[150px] rounded-lg font-semibold">
                {problem}
              </div>
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
        <div className="m-2 flex w-[250px] justify-between">
          <select className="rounded-lg bg-gray-200 px-2 py-1">
            <option value="15분">15분</option>
            <option value="15분">30분</option>
            <option value="15분">45분</option>
            <option value="15분">60분</option>
            <option value="15분">90분</option>
            <option value="15분">120분</option>
            <option value="15분">무제한</option>
          </select>
          <button className="bg-aod_accent text-aod_white rounded-lg px-5 py-1 text-sm hover:bg-gray-600">
            설정 완료
          </button>
        </div>
      </div>
    </>
  );
}
