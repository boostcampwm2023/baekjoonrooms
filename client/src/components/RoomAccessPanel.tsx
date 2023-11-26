import { Link } from 'react-router-dom';

import RoomCreateButton from './buttons/RoomCreateButton';
import RoomJoinButton from './buttons/RoomJoinButton';

export default function RoomAccessPanel() {
  return (
    <div className="flex w-[322px] flex-col items-center justify-center gap-4 rounded-xl border-8 border-gray-200 px-6 py-10">
      <Link to="/room/1">
        <RoomCreateButton />
      </Link>
      <p className="">- or -</p>
      <form className="flex items-center justify-between gap-2">
        <input
          className="rounded-lg bg-gray-200 px-2 py-1"
          placeholder="Room code"
        />
        <RoomJoinButton />
      </form>
    </div>
  );
}
