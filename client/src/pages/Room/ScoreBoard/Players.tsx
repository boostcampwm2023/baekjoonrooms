import { RxBorderSolid, RxCheck, RxCross1 } from 'react-icons/rx';
import { Score, Status } from '../../../types/Score';

interface PlayersProps {
  index: number;
  playerName: string;
  results: Score[];
}

export default function Players({ index, playerName, results }: PlayersProps) {

  return (
    <li
      className="flex flex-row bg-bg px-5 py-2.5 text-text_default odd:bg-bg_secondary"
      key={index}>
      <div>{playerName}</div>
      <ol className="flex w-full flex-row gap-1">
        {results.map((result,index) => (
          <li className="flex flex-1 flex-row items-center justify-around" key={index}>
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
