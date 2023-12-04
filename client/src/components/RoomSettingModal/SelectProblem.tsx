import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ProblemType } from '../../types/ProblemType';
import { Problem, searchProblem } from '../../apis/searchProblem';
import { useQuery } from '@tanstack/react-query';

interface SelectProblemProps {
  problem: ProblemType;
  setProblem: Dispatch<SetStateAction<ProblemType>>;
  problemList: ProblemType[];
  setProblemList: Dispatch<SetStateAction<ProblemType[]>>;
}

export default function SelectProblem({
  problem,
  setProblem,
  problemList,
  setProblemList,
}: SelectProblemProps) {
  const [searchResults, setSearchResults] = useState<Array<Problem>>([]);

  const { data: result } = useQuery({
    queryKey: ['searchProblem', problem.title],
    queryFn: () => searchProblem(problem.title),
  });

  useEffect(() => {
    if (result) {
      setSearchResults(result);
    }
  }, [result]);

  const onChangeInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblem({ ...problem, title: event.target.value });

    // if blank or whitespace, return
    if (!event.target.value.trim()) return;

    if (result) {
      setSearchResults(result);
    }
  };

  const registerProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProblemList([...problemList, problem]);
    setProblem({
      title: '',
      boj_problem_id: '',
      url: '',
      level: '',
      tag: [],
    });
  };

  const handleOptionClick = (option: Problem) => {
    console.log(option);
    setProblem({
      title: '',
      boj_problem_id: '',
      url: '',
      level: '',
      tag: [],
    });
    setSearchResults([]);
  };

  return (
    <form
      className="relative m-2 flex w-[250px] justify-between"
      onSubmit={registerProblem}>
      <input
        className="rounded-lg bg-default_white px-2"
        placeholder="문제를 입력하시오"
        value={problem.title}
        onChange={onChangeInput}
      />
      <SearchResults
        results={searchResults}
        onResultClick={handleOptionClick}
      />
      <button className="rounded-lg bg-accent px-3 py-1 text-sm text-default_white hover:opacity-80">
        등록
      </button>
    </form>
  );
}

interface SearchResultsProps {
  results: Problem[];
  onResultClick: (problem: Problem) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
}) => {
  return (
    <div className="bg-white absolute mt-10 max-h-[250px] w-full overflow-auto rounded bg-default_white">
      {results.map((result) => (
        <div
          key={result.bojProblemId}
          className="hover:bg-gray-200 cursor-pointer p-2"
          onClick={() => onResultClick(result)}>
          {result.title}
        </div>
      ))}
    </div>
  );
};
