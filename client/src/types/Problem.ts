import { Tag } from "./Tag";
export interface ProblemResponse {
  bojProblemId: number;
  id: number;
  level: number;
  tags: Tag[];
  title: string;
}
