export interface ProblemType {
  bojProblemId: number;
  title: string;
  level: number;
  tags?: Tag[];
  url?: string;
}

interface Tag {
  id: number;
  name: string;
}
