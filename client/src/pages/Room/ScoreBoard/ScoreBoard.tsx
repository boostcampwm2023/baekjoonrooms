import { useRoom } from '../../../hooks/useRoom';
import { ScoreBoardInformation } from '../../../types/ScoreBoardInformation';
import { Submission } from '../../../types/Submission';
import Players from './Players';

interface ScoreBoardProps {
  scores: ScoreBoardInformation;
}

interface PlayerScore {
  playerName: string;
  results: Submission[];
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  const { participantNames, problems } = useRoom().roomInfo;

  const playerNames: string[] = participantNames;
  const problemIds: number[] = problems.map((problem) => problem.bojProblemId);

  const playerScores: PlayerScore[] = playerNames.map((playerName) => {
    const results: Submission[] = problemIds.map((problemId) => {
      const submissions = scores.submissions.find(
        (score) =>
          score.username === playerName && score.bojProblemId === problemId,
      );
      return (
        submissions || {
          username: playerName,
          bojProblemId: problemId,
          status: 'WAITING',
        }
      );
    });
    return { playerName, results };
  });

  const sortedPlayerScores: PlayerScore[] = scores.rankings
    .map((ranking) =>
      playerScores.find(
        (playerScore) => playerScore.playerName === ranking.username,
      ),
    )
    .filter(
      (playerScore): playerScore is PlayerScore => playerScore !== undefined,
    );

  return (
    <ul className="my-5 flex w-full flex-col overflow-auto text-sm font-medium text-text_default">
      {sortedPlayerScores.map((playerScore, index) => (
        <Players
          key={index}
          index={index}
          playerName={playerScore.playerName}
          results={playerScore.results}
        />
      ))}
    </ul>
  );
}
