// 아래 타입은 프론트에서 사용하는 Problem 타입입니다.
export interface ProblemType {
  boj_problem_id: number | undefined;
  title: string;
  url: string;
  tag: string[];
  level: number | undefined;
}
