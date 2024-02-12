import { RxBorderSolid, RxCheck, RxCross1 } from 'react-icons/rx';
import { Submission, Status } from '../../../types/Submission';

interface PlayersProps {
  index: number;
  playerName: string;
  results: Submission[];
}

export default function Players({ index, playerName, results }: PlayersProps) {
  const getOrdinal = (n: number) => {
    if (n === 1) return '1st';
    else if (n === 2) return '2nd';
    else if (n === 3) return '3rd';
    else return n + 'th';
  };

  return (
    <li
      className="flex flex-row bg-bg px-5 py-2.5 text-text_default odd:bg-bg_secondary"
      key={index}>
      <div className="flex w-16 justify-center pr-4 text-base font-bold">
        {getOrdinal(index + 1)}
      </div>
      <div className="flex items-center pr-2">{playerName}</div>
      <ol className="flex w-full flex-row gap-1">
        {results.map((result, index) => (
          <li
            className="flex flex-1 flex-row items-center justify-around"
            key={index}>
            {result.status === Status.ACCEPTED ? (
              <RxCheck className="text-green" strokeWidth={2} size={20} />
            ) : result.status === Status.WRONG ? (
              <RxCross1 className="text-red" strokeWidth={2} size={16} />
            ) : (
              <RxBorderSolid />
            )}
          </li>
        ))}
      </ol>
    </li>
  );
}
