import { RxExit } from 'react-icons/rx';

export default function ExitButton() {
  const exit =() => {
    window.location.href = '/lobby';
  }
  return (
    <button
      className="flex flex-row items-center gap-x-2 rounded-lg bg-aod_accent px-2.5 py-1 text-aod_white hover:opacity-80"
      onClick={exit}>
      <RxExit
        style={{
          fontWeight: 'bold',
        }}
      />
      <div className="font-medium ">Exit</div>
    </button>
  );
}


