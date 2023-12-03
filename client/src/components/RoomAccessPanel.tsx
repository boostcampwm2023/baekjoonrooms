import RoomCreateButton from './buttons/RoomCreateButton';
import RoomJoinButton from './buttons/RoomJoinButton';

export default function RoomAccessPanel() {
  return (
    <div className="border-gutter flex w-[322px] flex-col items-center justify-center gap-4 rounded-xl border-8 px-6 py-10">
      <RoomCreateButton />
      <p className="text-text_default">- or -</p>
      <RoomJoinButton />
    </div>
  );
}
