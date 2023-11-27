import AcceptedSubmissionIcon from '../../icons/AcceptedSubmissionIcon';
import { ResultType } from '../../types/ScoreType';

interface ResultProps {
  result: ResultType;
}

export function Result({ result }: ResultProps) {
  return (
    <div className="flex flex-1 flex-row justify-around">
      {result === ResultType.CORRECT ? (
        <AcceptedSubmissionIcon />
      ) : result === ResultType.WRONG ? (
        <AcceptedSubmissionIcon />
      ) : (
        <AcceptedSubmissionIcon />
      )}
    </div>
  );
}
