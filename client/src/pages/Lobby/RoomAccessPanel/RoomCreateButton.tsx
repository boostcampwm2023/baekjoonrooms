import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createRoom } from '../../../apis/createRoom';
import { RoomCreateType } from '../../../types/RoomCreateType';

export default function RoomCreateButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createRoom,
    onSuccess: (roomInfo: RoomCreateType | undefined) => {
      const roomCode = roomInfo?.code;
      queryClient.setQueryData(['myRoomCode'], roomCode);
      navigate(`/room/${roomCode}`, {
        state: { isHost: true, roomCode: roomCode },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <button
          className="flex h-[33px] w-[150px] items-center justify-center rounded-lg bg-accent font-medium text-default_white hover:opacity-80"
          onClick={() => mutate()}>
          Create room
        </button>
      )}
    </>
  );
}
