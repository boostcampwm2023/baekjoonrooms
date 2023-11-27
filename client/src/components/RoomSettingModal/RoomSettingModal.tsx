import { useState } from 'react';

import SelectProblem from './SelectProblem';
import RandomProblem from './RandomProblem';
import ToggleIcon from '../../icons/ToggleIcon';

export default function RoomSettingModal() {
  const [problem, setProblem] = useState('');
  const [problemList, setProblemList] = useState<string[]>([]);
  const [isRandom, setIsRandom] = useState<boolean>(false);

  const deleteProblem = (deleteIndex: number) => {
    setProblemList(problemList.filter((_, index) => index !== deleteIndex));
  };

  const togleType = () => {
    setIsRandom(!isRandom);
  };

  return (
    <>
      <div className="bg-aod_fg flex h-[430px] w-[330px] flex-col items-center">
        <div className="text-aod_text mb-2 mt-4 flex gap-2 text-lg font-semibold">
          {isRandom ? '랜덤 출제' : '번호로 출제'}
          <button onClick={togleType}>
            <ToggleIcon />
          </button>
        </div>
        {isRandom ? (
          <RandomProblem />
        ) : (
          <SelectProblem
            problem={problem}
            setProblem={setProblem}
            problemList={problemList}
            setProblemList={setProblemList}
          />
        )}
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
