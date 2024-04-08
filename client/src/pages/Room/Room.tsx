import Problems from './Problems/Problems';
import ScoreboardButton from './ScoreBoard/ScoreBoardButton';
import Chat from './Chat/Chat';
import StartButton from './Timer/StartButton';
import RoomInfo from './RoomInfo/RoomInfo';

export default function Room() {
  return (
    <div className="flex items-center justify-center bg-fg">
      <div className="flex h-screen w-full flex-col items-center gap-2 rounded-lg bg-bg p-4 shadow-2xl md:w-[70%] lg:w-[50%]">
        <RoomInfo />
        <Problems />
        <ScoreboardButton />
        <StartButton />
        <Chat />
      </div>
    </div>
  );
}
