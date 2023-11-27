import problems from '../../public/mocks/UpdateRoom.json';
import Problems from '../components/Problems';
import ScoreboardButton from '../components/buttons/ScoreBoardButton';
import Chat from '../components/Chat';
import StartButton from '../components/buttons/StartButton';
import RoomInfo from '../components/RoomInfo';

export default function Room() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-aod_fg">
      <div className="z-10 flex min-h-screen min-w-[300px] flex-col items-center gap-2 rounded-lg bg-aod_bg p-4 shadow-2xl">
        <RoomInfo />
        <Problems problems={problems.problems} />
        <ScoreboardButton />
        <Chat />
        <StartButton />
      </div>
    </div>
  );
}
