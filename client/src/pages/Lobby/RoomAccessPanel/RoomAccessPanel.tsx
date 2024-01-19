import RoomCreateButton from './RoomCreateButton';
import RoomJoinButton from './RoomJoinButton';

export default function RoomAccessPanel() {
  return (
    <div className="flex w-[322px] flex-col items-center justify-center gap-4 rounded-xl border-8 border-gutter px-6 py-10">
      <RoomCreateButton />
      <p className="text-text_default">- or -</p>
      <RoomJoinButton />
    </div>
  );
}
