import { ProblemType } from './ProblemType';

export type RoomInfoType = {
  participantNames: string[];
  problems: ProblemType[];
  isStarted: boolean;
  endTime?: number;
  duration?: number;
};
