import { useState } from 'react';
import { useRoom } from '../../hooks/useRoom';

export type StartButtonProps = {
  start: () => void;
  timer: string;
};

export default function StartButton() {
  const { isHost, socketRef, roomInfo } = useRoom();

  // TODO: 이거 내일 얘기해보고 Provider로 옮길 수 있음, 내 생각에 이 로직은 setRoomInfo쪽으로 들어가는게 맞는 것 같음
  const [timer, setTimer] = useState(`${isHost ? 'start' : 'waiting'}`);
  const start = () => {
    // isHost && setTimer('0:00:00');

    console.log('start');
    console.log(roomInfo);

    const socket = socketRef.current;

    socket?.emit('game-start', roomInfo);
  };
  return (
    <div className="flex w-full justify-end">
      <button
        onClick={start}
        className="flex h-[33px] w-full items-center justify-center rounded-lg bg-accent font-medium text-default_white hover:opacity-80">
        {timer}
      </button>
    </div>
  );
}
