import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export default function RoomJoinButton() {
  const [roomCode, setRoomCode] = useState<string>('');
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (roomCode === '') {
      alert('방 코드를 입력해주세요.');
      return;
    }

    // TODO: 여기도 서버 로직 나오면 수정
    navigate(`/room/${'q1w2e3'}`, { state: { isHost: false } });
  };

  return (
    <form className="flex items-center justify-between gap-2">
      <input
        className="rounded-lg bg-aod_white px-2 py-1"
        placeholder="Room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button
        className="h-[33px] w-[60px] items-center justify-center rounded-lg bg-aod_accent font-medium text-aod_white hover:opacity-80"
        onClick={onClick}>
        Join
      </button>
    </form>
  );
}
