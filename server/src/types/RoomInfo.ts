import { ProblemType } from './ProblemType';

export type RoomInfo = {
  participantNames: string[];
  problems: ProblemType[];
  isStarted: boolean;
  endTime?: Date;
  duration?: number;
};
