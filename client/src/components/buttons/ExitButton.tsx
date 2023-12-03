import { RxExit } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

export default function ExitButton() {
  const navigate = useNavigate();

  const exit = () => {
    navigate(`/lobby`);
  };
  return (
    <button
      id="room-exit-button"
      className="bg-accent text-default_white flex flex-row items-center gap-x-2 rounded-lg px-2.5 py-1 hover:opacity-80"
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
