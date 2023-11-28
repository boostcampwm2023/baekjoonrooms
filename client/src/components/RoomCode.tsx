import CopyIcon from '../icons/CopyIcon';

export default function RoomCode({ code }: { code: string }) {
  return (
    <div className="text-md flex cursor-pointer flex-row items-center justify-center gap-1 rounded-lg bg-aod_text_alt bg-opacity-80 px-2 py-1 font-bold text-aod_text">
      {code}
      <CopyIcon />
    </div>
  );
}
