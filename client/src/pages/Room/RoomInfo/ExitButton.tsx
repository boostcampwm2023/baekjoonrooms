import { RxExit } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { exitRoom } from '../../../apis/exitRoom';

export default function ExitButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: exitRoom,
    onSuccess: () => {
      queryClient.setQueryData(['myRoomCode'], undefined);
      navigate(`/lobby`);
    },
    onError: () => {
      alert('방 나가기에 실패했습니다.');
    },
  });

  return (
    <button
      id="room-exit-button"
      className="flex flex-row items-center gap-x-2 rounded-lg bg-accent px-2.5 py-1 text-default_white hover:opacity-80"
      onClick={() => mutate()}>
      <RxExit
        style={{
          fontWeight: 'bold',
        }}
      />
      <div className="font-medium ">Exit</div>
    </button>
  );
}
