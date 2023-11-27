import { Dispatch, SetStateAction } from 'react';

interface SelectProblemProps {
  problem: string;
  setProblem: Dispatch<SetStateAction<string>>;
  problemList: string[];
  setProblemList: Dispatch<SetStateAction<string[]>>;
}

export default function SelectProblem({
  problem,
  setProblem,
  problemList,
  setProblemList,
}: SelectProblemProps) {
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(event.target.value);
  };
  const registerProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProblemList([...problemList, problem]);
    setProblem('');
  };

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
