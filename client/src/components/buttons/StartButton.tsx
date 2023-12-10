import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { RoomInfoType } from '../../types/RoomInfoType';

export type StartButtonProps = {
  start: () => void;
  timer: string;
};

export default function StartButton({
  isHost,
  socketRef,
  roomInfo,
}: {
  isHost: boolean;
  socketRef: React.MutableRefObject<Socket | null>;
  roomInfo: RoomInfoType;
}) {
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
