import { getScores } from '../../../apis/scores';
import { useRoom } from '../../../hooks/useRoom';
import Players from './Players';

export default function ScoreBoard() {

  const scores = getScores(useRoom().roomCode);
  const playerNames = useRoom().roomInfo.participantNames;

  const playerScores = [];


  return (
    <ul className="my-5 flex w-full flex-col overflow-auto text-sm font-medium text-text_default">
      
    </ul>
  );
}
