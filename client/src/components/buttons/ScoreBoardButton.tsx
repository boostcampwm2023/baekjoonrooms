import GraphIcon from '../../icons/GraphIcon';

export default function ScoreboardButton() {
  return (
    <button className="text-aod_white flex w-full flex-row items-center justify-center rounded-lg bg-aod_accent px-3 py-2 hover:opacity-80">
      <GraphIcon />
      <div className="pl-2 font-medium">Scoreboard</div>
    </button>
  );
}
