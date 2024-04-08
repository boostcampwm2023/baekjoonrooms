import { useRoom } from '../../../hooks/useRoom';
import { useRoomStore } from '../../../store/roomStore';
import Timer from './Timer';

export type StartButtonProps = {
  start: () => void;
  timer: string;
};

export default function StartButton() {
  const { socketRef } = useRoom();
  const { isHost, roomInfo, problems, duration } = useRoomStore();

  const start = () => {
    console.log('start');

    if (!roomInfo) {
      alert('방 정보가 없습니다.');
      return;
    }

    if (problems.length === 0) {
      alert('문제를 하나 이상 설정해주세요.');
      return;
    }

    if (duration === 0) {
      alert('시간을 설정해주세요.');
      return;
    }

    roomInfo.problems = problems;
    roomInfo.duration = duration;

    console.log(roomInfo);

    const socket = socketRef.current;
    socket?.emit('game-start', roomInfo);
    console.log(' game-start');
  };

  return (
    <div className="flex w-full justify-end">
      {!roomInfo.isStarted ? (
        isHost ? (
          <>
            <button
              onClick={start}
              className="flex h-[33px] w-full items-center justify-center rounded-lg bg-accent font-medium text-default_white hover:opacity-80">
              <span> Start </span>
            </button>
          </>
        ) : (
          <>
            <div className="flex h-[33px] w-full items-center justify-center rounded-lg bg-accent font-medium text-default_white">
              <span> Waiting </span>
            </div>
          </>
        )
      ) : (
        <div className="flex h-[33px] w-full items-center justify-center rounded-lg bg-accent font-medium text-default_white">
          <Timer endTime={roomInfo.endTime!} />
        </div>
      )}
    </div>
  );
}
