import { ProblemType } from "./ProblemType";

export interface RoomInfoType {
  participantNames: string[];
  problems: ProblemType[];
  isStarted: boolean;
  endTime?: Date;
  duration?: number;
}
