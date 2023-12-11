import { RxCheck, RxCross1, RxBorderSolid } from 'react-icons/rx';
import { Status } from '../../../types/Score';

export default function Result({ result }) {
  return (
    <div className="flex flex-1 flex-row items-center justify-around">
      {result === Status.ACCEPTED ? (
        <RxCheck className="text-green" strokeWidth={2} size={20} />
      ) : result === Status.WRONG ? (
        <RxCross1 className="text-red" strokeWidth={2} size={16} />
      ) : (
        <RxBorderSolid />
      )}
    </div>
  );
}
