import ExitButton from '../buttons/ExitButton';
import { FaRegCopy } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRoom } from '../../hooks/useRoom';

export default function RoomInfo() {
  const { roomCode } = useRoom();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success('Copied to clipboard!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-row items-center rounded-lg text-text_default">
          <div className="pr-3 text-xl font-bold">{roomCode}</div>
          <button onClick={copyToClipboard}>
            <FaRegCopy />
          </button>
        </div>
        <ExitButton />
      </div>
      <ToastContainer toastClassName={'bg-fg text-text_default'} />
    </>
  );
}
