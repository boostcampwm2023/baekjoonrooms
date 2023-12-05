import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../apis/createRoom';
import { useState } from 'react';
import { RoomCreateType } from '../../types/RoomCreateType';

export default function RoomCreateButton() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onClick = async () => {
    setIsLoading(true);
    try {
      const roomInfo: RoomCreateType | undefined = await createRoom();
      if (roomInfo === undefined) {
        // setTimeout(() => {
        //   alert('방 생성에 실패했습니다.');
        //
        // }, 1000);
        setIsLoading(false);
        return;
      }
      const roomCode = roomInfo.code;
      navigate(`/room/${roomCode}`, {
        state: { isHost: true, roomCode: roomCode },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <button
          className="flex h-[33px] w-[150px] items-center justify-center rounded-lg bg-accent font-medium text-default_white hover:opacity-80"
          onClick={onClick}>
          Create room
        </button>
      )}
    </>
  );
}
