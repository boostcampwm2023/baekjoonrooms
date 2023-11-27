import CreateRoom from '../../public/mocks/CreateRoom.json';
import ExitButton from './buttons/ExitButton';
import { FaRegCopy } from 'react-icons/fa6';

export default function RoomInfo() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-row items-center rounded-lg text-aod_text">
        <div className="pr-3 text-xl font-bold">{CreateRoom.code}</div>
        <button>
          <FaRegCopy />
        </button>
      </div>
      <ExitButton />
    </div>
  );
}
