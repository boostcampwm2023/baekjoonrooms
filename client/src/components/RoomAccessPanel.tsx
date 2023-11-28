import RoomCreateButton from './buttons/RoomCreateButton';
import RoomJoinButton from './buttons/RoomJoinButton';

export default function RoomAccessPanel() {
  return (
    <div className="flex w-[322px] flex-col items-center justify-center gap-4 rounded-xl border-8 border-aod_gutter px-6 py-10">
      <RoomCreateButton />
      <p className="text-aod_text">- or -</p>
      <RoomJoinButton />
    </div>
  );
}
