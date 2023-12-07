import { RxExit } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { exitRoom } from '../../apis/exitRoom';

export default function ExitButton() {
  const navigate = useNavigate();

  const exit = async () => {
    try {
      await exitRoom();
      navigate(`/lobby`);
    } catch (err) {
      console.error(err);
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
