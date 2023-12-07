import { useQuery } from '@tanstack/react-query';
import { searchProblem } from '../../apis/searchProblem';
import { ProblemResponse } from '../../types/Problem';

interface SearchResultsProps {
  input: string;
  onResultClick: (problem: ProblemResponse) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  input,
  onResultClick,
}) => {
  // TODO : debouncing 로직
  const {
    isPending,
    isError,
    data: results,
  } = useQuery({
    queryKey: ['searchProblem', input],
    queryFn: () => searchProblem(input),
    staleTime: Infinity,
  });

  if (isError) {
    return;
  }

  return (
    <div className="bg-white absolute mt-10 max-h-[250px] w-full overflow-auto rounded bg-default_white">
      {isPending ? (
        <div className="text-center">loading...</div>
      ) : (
        results.slice(0, 100).map((result: ProblemResponse) => (
          <div
            key={result.bojProblemId}
            className="hover:bg-gray-200 cursor-pointer p-2"
            onClick={() => onResultClick(result)}>
            {result.bojProblemId}. {result.title}
          </div>
        ))
      )}
    </div>
  );
};
