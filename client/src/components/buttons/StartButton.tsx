import { useRoom } from '../../hooks/useRoom';
import Timer from '../Room/Timer';

export type StartButtonProps = {
  start: () => void;
  timer: string;
};

export default function StartButton() {
  const { socketRef, isHost, roomInfo, problems, duration } = useRoom();

  // TODO: 이거 내일 얘기해보고 Provider로 옮길 수 있음, 내 생각에 이 로직은 setRoomInfo쪽으로 들어가는게 맞는 것 같음
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
  };
  return (
    <div className="flex w-full justify-end">
      <button
        onClick={start}
        className="flex h-[33px] w-full items-center justify-center rounded-lg bg-accent font-medium text-default_white hover:opacity-80">
        {!roomInfo.isStarted ? (
          isHost ? (
            <>
              <span> Start </span>
            </>
          ) : (
            <>
              <span> Waiting...</span>
            </>
          )
        ) : (
          <Timer endTime={roomInfo.endTime!} />
        )}
      </button>
    </div>
  );
}
