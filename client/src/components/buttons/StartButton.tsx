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
        className="m-1 flex flex-row items-center justify-center rounded-[21px] p-1">
        {timer}
      </button>
    </div>
  );
}
