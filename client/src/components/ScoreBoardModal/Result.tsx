import { RxCheck, RxCross1, RxBorderSolid } from 'react-icons/rx';

import { ScoreResult } from '../../types/ScoreType';

interface ResultProps {
  result: ScoreResult;
}

export default function Result({ result }: ResultProps) {
  return (
    <div className="flex flex-1 flex-row justify-around">
      {result === ScoreResult.CORRECT ? (
        <RxCheck className="text-aod_green" strokeWidth={2} />
      ) : result === ScoreResult.WRONG ? (
        <RxCross1 className="text-aod_red" strokeWidth={2} />
      ) : (
        <RxBorderSolid />
      )}
    </div>
  );
}
