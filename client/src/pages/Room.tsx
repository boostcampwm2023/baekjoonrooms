import problems from '../../public/mocks/UpdateRoom.json';
import Problems from '../components/Problems';
import ScoreboardButton from '../components/buttons/ScoreBoardButton';
import Chat from '../components/Chat';
import StartButton from '../components/buttons/StartButton';
import RoomInfo from '../components/RoomInfo';

export default function Room() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-aod_bg">
      <div className="border-aod_gutter flex w-[322px] flex-col items-center justify-center gap-4 rounded-xl border-8 px-6 py-10">
        <RoomInfo />
        <Problems problems={problems.problems} />
        <ScoreboardButton />
        <Chat />
        <StartButton />
      </div>
    </div>
  );
}
