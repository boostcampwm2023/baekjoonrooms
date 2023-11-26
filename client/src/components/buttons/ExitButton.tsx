import ExitIcon from '../../icons/ExitIcon';

export default function ExitButton() {
  return (
    <button className="text-aod_white flex flex-row items-center gap-x-2 rounded-lg bg-aod_accent px-2.5 py-1 hover:opacity-80">
      <ExitIcon />
      <div className="font-medium ">Exit</div>
    </button>
  );
}
