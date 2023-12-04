import { useLocation } from 'react-router-dom';

import Problems from '../components/Problems';
import ScoreboardButton from '../components/buttons/ScoreBoardButton';
import Chat from '../components/Chat';
import StartButton from '../components/buttons/StartButton';
import RoomInfo from '../components/RoomInfo';

export default function Room() {
  const location = useLocation();
  const isHost = location.state?.isHost;
  const roomCode = location.state?.roomCode;

  return (
    <div className="flex items-center justify-center bg-fg">
      <div className="flex max-h-screen w-full flex-col items-center gap-2 rounded-lg bg-bg p-4 shadow-2xl md:w-[70%] lg:w-[50%]">
        <RoomInfo roomCode={roomCode} />
        <Problems isHost={isHost} />
        <ScoreboardButton />
        <StartButton isHost={isHost} />
        <Chat />
      </div>
    </div>
  );
}
