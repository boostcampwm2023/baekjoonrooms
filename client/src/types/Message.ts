export interface RoomMessagesLocalStorage {
  roomId: string;
  messages: MessageInterface[];
}

export interface MessageInterface {
  timestamp: number;
  username: string;
  body: string;
  chatEvent: chatEvent;
  color: string;
}

export const chatEvent = {
  Message: 'Message',
  Join: 'Join',
  Leave: 'Leave',
  Submit: 'Submit',
  Accepted: 'Accepted',
  Complete: 'Complete',
} as const;
type chatEvent = (typeof chatEvent)[keyof typeof chatEvent];
