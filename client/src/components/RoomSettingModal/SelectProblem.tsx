import { Dispatch, SetStateAction, useState } from 'react';
import { ProblemType } from '../../types/ProblemType';
import { ProblemResponse } from '../../types/Problem';
import { SearchResults } from '../SearchResults';

interface SelectProblemProps {
  problem: ProblemType;
  setProblem: Dispatch<SetStateAction<ProblemType>>;
  problemList: ProblemType[];
  setProblemList: Dispatch<SetStateAction<ProblemType[]>>;
}

export default function SelectProblem({
  problemList,
  setProblemList,
}: SelectProblemProps) {
  const [searchInput, setSearchInput] = useState<string>('');

  const onChangeInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);

    // if blank or whitespace, return
    if (!event.target.value.trim()) return;
  };

  const registerProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleOptionClick = (option: ProblemResponse) => {
    const newProblem: ProblemType = {
      title: option.title,
      boj_problem_id: option.bojProblemId,
      url: `https://www.acmicpc.net/problem/${option.bojProblemId}}`,
      level: option.level,
      tag: option.tags.map((tag) => tag.name),
    };
    setProblemList([...problemList, newProblem]);
    setSearchInput('');
  };

  return (
    <form
      className="relative m-2 flex w-[250px] justify-between"
      onSubmit={registerProblem}>
      <input
        className="rounded-lg bg-default_white px-2"
        placeholder="문제를 입력하시오"
        value={searchInput}
        onChange={onChangeInput}
      />
      <SearchResults
        input={searchInput}
        onResultClick={handleOptionClick}
      />
      <button className="rounded-lg bg-accent px-3 py-1 text-sm text-default_white hover:opacity-80">
        등록
      </button>
    </form>
  );
}
