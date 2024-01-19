import Problems from '../components/Room/Problems';
import ScoreboardButton from '../components/buttons/ScoreBoardButton';
import Chat from '../components/Room/Chat';
import StartButton from '../components/buttons/StartButton';
import RoomInfo from '../components/Room/RoomInfo';

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
