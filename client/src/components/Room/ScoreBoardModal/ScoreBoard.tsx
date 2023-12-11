import { useRoom } from '../../../hooks/useRoom';
import { Score } from '../../../types/Score';
import Players from './Players';

interface ScoreBoardProps {
  scores: Score[];
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  const { participantNames, problems } = useRoom().roomInfo;


  const playerNames: string[] = participantNames;
  const problemIds: number[] = problems.map((problem) => problem.bojProblemId);

  const playerScores: Array<{ playerName: string; results: Score[] }> =
    playerNames.map((playerName) => {
      const results: Score[] = problemIds.map((problemId) => {
        const score = scores.find(
          (score) =>
            score.username === playerName && score.bojProblemId === problemId,
        );
        return score
          ? score
          : { username: playerName, bojProblemId: problemId, status: 'WAITING' };
      });
      return { playerName: playerName, results: results };
    });


  return (
    <ul className="my-5 flex w-full flex-col overflow-auto text-sm font-medium text-text_default">
      {playerScores.map((playerScore, index) => (
        <Players
          key={index}
          playerName={playerScore.playerName}
          results={playerScore.results}
        />
      ))}
    </ul>
  );
}
