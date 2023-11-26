import { ProblemType } from '../types/ProblemType';
import { ProblemButton } from './buttons/ProblemButton';

type ProblemProps = {
  problems: ProblemType[];
};

export default function Problems({ problems: problemProps }: ProblemProps) {
  return (
    <ul>
      {problemProps.map((problem) => (
        <ProblemButton key={problem.boj_problem_id} {...problem} />
      ))}
    </ul>
  );
}
