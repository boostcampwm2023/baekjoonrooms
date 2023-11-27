import { RxCheck, RxCross1, RxBorderSolid } from 'react-icons/rx';

import { ResultType } from '../../types/ScoreType';

interface ResultProps {
  result: ResultType;
}

export default function Result({ result }: ResultProps) {
  return (
    <div className="flex flex-1 flex-row justify-around">
      {result === ResultType.CORRECT ? (
        <RxCheck className="text-aod_green" strokeWidth={2} />
      ) : result === ResultType.WRONG ? (
        <RxCross1 className="text-aod_red" strokeWidth={2} />
      ) : (
        <RxBorderSolid />
      )}
    </div>
  );
}
