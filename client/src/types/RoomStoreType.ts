import { MessageInterface } from "./Message";
import { RoomInfoType } from "./RoomInfoType";
import { ProblemType } from "./ProblemType";

export type RoomStoreType = {
  isHost: boolean;
  roomCode: string;
  roomId: string | undefined;
  messages: MessageInterface[];
  setMessages: (messages: ((prevMessages: MessageInterface[]) => MessageInterface[]) | MessageInterface[]) => void;
  roomInfo: RoomInfoType;
  setRoomInfo: (roomInfo: RoomInfoType) => void;
  problems: ProblemType[];
  setProblems: (problems: ProblemType[]) => void;
  duration: number;
  setDuration: (duration: number) => void;
};