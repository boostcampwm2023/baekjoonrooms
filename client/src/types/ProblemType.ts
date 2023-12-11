import { Tag } from './Tag';
export interface ProblemType {
  bojProblemId: number;
  title: string;
  level: number;
  tags: Tag[];
  url?: string;
}
