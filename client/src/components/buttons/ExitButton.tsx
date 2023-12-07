import { RxExit } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { exitRoom } from '../../apis/exitRoom';

export default function ExitButton() {
  const navigate = useNavigate();

  const exit = () => {
    try {
      exitRoom();
      navigate(`/lobby`);
    } catch (err) {
      alert('방 나가기에 실패했습니다.');
      throw err;
    }
  };
  return (
    <button
      id="room-exit-button"
      className="flex flex-row items-center gap-x-2 rounded-lg bg-accent px-2.5 py-1 text-default_white hover:opacity-80"
      onClick={exit}>
      <RxExit
        style={{
          fontWeight: 'bold',
        }}
      />
      <div className="font-medium ">Exit</div>
    </button>
  );
}
