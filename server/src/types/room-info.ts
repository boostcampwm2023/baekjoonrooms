import { ProblemType } from './problem-type';

export type RoomInfoType = {
  participantNames: string[];
  problems: ProblemType[];
  isStarted: boolean;
  endTime?: number;
  duration?: number;
};
