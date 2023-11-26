import CreateRoom from '../../public/mocks/CreateRoom.json';

export default function RoomInfo() {
  return (
    <div className="flex w-full items-center justify-between py-2.5">
      <div className="flex flex-row items-center rounded-lg p-2">
        <div className="pr-3 text-xl font-bold">{CreateRoom.code}</div>
        <button className="rounded p-1">
          <img src="../assets/copy.png" alt="copy" className="h-6 w-auto" />
        </button>
      </div>
      <button className="flex flex-row items-center gap-x-2 rounded-lg p-2">
        <img src="../assets/exit.png" alt="exit" className="h-6 w-auto" />
        <div className="text-xl font-semibold">Exit</div>
      </button>
    </div>
  );
}
