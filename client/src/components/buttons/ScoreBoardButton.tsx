import { FaChartSimple } from 'react-icons/fa6';

export default function ScoreboardButton() {
  return (
    <button className="flex w-full flex-row items-center justify-center rounded-lg bg-aod_accent px-3 py-2 text-aod_white hover:opacity-80">
      <FaChartSimple />
      <div className="pl-2 font-medium">Scoreboard</div>
    </button>
  );
}
