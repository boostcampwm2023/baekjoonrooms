import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import axios from 'axios';

export default function RoomJoinButton() {
  const [roomCode, setRoomCode] = useState<string>('');

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const navigate = useNavigate();

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (roomCode === '') {
      alert('방 코드를 입력해주세요.');
      return;
    }

    try {
      await axios.post(
        `${VITE_BASE_URL}/room/${roomCode}`,
        {},
        {
          withCredentials: true,
        },
      );

      navigate(`/room/${roomCode}`, {
        state: { roomCode: roomCode, isHost: false },
      });
      return;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
        setRoomCode('');
      } else {
        console.error(err);
        console.trace(err);
      }
    }
  };

  return (
    <form className="flex items-center justify-between gap-2">
      <input
        className="rounded-lg bg-default_white px-2 py-1"
        placeholder="Room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button
        className="h-[33px] w-[60px] items-center justify-center rounded-lg bg-accent font-medium text-default_white hover:opacity-80"
        onClick={onClick}>
        Join
      </button>
    </form>
  );
}
