// DB에서 오는 Problem과 사용하는 ProblemType이 조금 달라서 헷갈릴 것 같네요.
// 아래 타입은 DB에서 오는 Problem의 타입입니다.
export interface ProblemResponse {
  bojProblemId: number;
  id: number;
  level: number;
  title: string;
}
