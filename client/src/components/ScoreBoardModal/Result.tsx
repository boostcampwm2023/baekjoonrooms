import { RxCheck, RxCross1, RxBorderSolid } from 'react-icons/rx';

import { ScoreResult } from '../../types/ScoreType';

interface ResultProps {
  result: ScoreResult;
}

export default function Result({ result }: ResultProps) {
  return (
    <div className="flex flex-1 flex-row justify-around items-center">
      {result === ScoreResult.CORRECT ? (
        <RxCheck className="text-green" strokeWidth={2} size={20} />
      ) : result === ScoreResult.WRONG ? (
        <RxCross1 className="text-red" strokeWidth={2} size={16} />
      ) : (
        <RxBorderSolid />
      )}
    </div>
  );
}
