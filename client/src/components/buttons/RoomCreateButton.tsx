import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../apis/createRoom';
import { useState } from 'react';
import { RoomCreateType } from '../../types/RoomCreateType';

export default function RoomCreateButton() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onClick = async () => {
    setIsLoading(true);
    const roomInfo: RoomCreateType | undefined = await createRoom();
    if (roomInfo === undefined) {
      setTimeout(() => {
        console.log(roomInfo);
        alert('방 생성에 실패했습니다.');
        setIsLoading(false);
      }, 1000);

      return;
    }
    const roomCode = roomInfo.code;
    navigate(`/room/${roomCode}`, {
      state: { isHost: true, roomCode: roomCode },
    });
  };

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <button
          className="bg-accent text-default_white flex h-[33px] w-[150px] items-center justify-center rounded-lg font-medium hover:opacity-80"
          onClick={onClick}>
          Create room
        </button>
      )}
    </>
  );
}
