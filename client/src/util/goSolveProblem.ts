import { ProblemType } from "../types/ProblemType";

export const goSolveProblem = (problem:ProblemType) => () => {
    window.open(problem.url);
  };