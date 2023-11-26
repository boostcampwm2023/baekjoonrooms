import CreateRoom from '../../public/mocks/CreateRoom.json';
import CopyIcon from '../icons/CopyIcon';
import ExitIcon from '../icons/ExitIcon';

export default function RoomInfo() {
  return (
    <div className="flex w-full items-center justify-between py-2.5">
      <div className="flex flex-row items-center rounded-lg p-2 text-aod_text">
        <div className="pr-3 text-xl font-bold">
          {CreateRoom.code}
        </div>
        <CopyIcon />
      </div>
      <button className="flex flex-row items-center gap-x-2 rounded-lg p-2">
        <ExitIcon />
        <div className="text-xl font-semibold text-aod_text">Exit</div>
      </button>
    </div>
  );
}