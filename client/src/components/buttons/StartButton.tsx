import { useState } from "react";

export type StartButtonProps = {
  start: () => void;
  timer: string;
};

export default function StartButton() {
  const [timer, setTimer] = useState('start');
  const start = () => {
    setTimer('0:00:00');
  }
  return (
    <div className="flex w-full justify-end">
      <button
        onClick={start}
        className="bg-aod_accent text-aod_white flex h-[33px] w-[150px] items-center justify-center rounded-lg font-medium hover:opacity-80">
        {timer}
      </button>
    </div>
  );
}
