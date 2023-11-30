import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../apis/createRoom';
import { useState } from 'react';

export default function RoomCreateButton() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onClick = async () => {
    setIsLoading(true);
    const roomId: string | undefined = await createRoom();
    if (roomId === undefined) {
      setTimeout(() => {
        console.log(roomId);
        alert('방 생성에 실패했습니다.');
        setIsLoading(false);
      }, 1000);

      return;
    }
    navigate(`/room/${roomId}`, { state: { isHost: true, roomCode: roomId } });
  };

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <button
          className="flex h-[33px] w-[150px] items-center justify-center rounded-lg bg-aod_accent font-medium text-aod_white hover:opacity-80"
          onClick={onClick}>
          Create room
        </button>
      )}
    </>
  );
}
