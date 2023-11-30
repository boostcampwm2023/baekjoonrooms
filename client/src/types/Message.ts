export interface RoomMessagesLocalStorage {
  roomId: string;
  messages: MessageInterface[];
}

export interface MessageInterface {
  timestamp: number;
  username: string;
  body: string;
  chatEvent: ChatEvent;
  color: string;
}

export const ChatEvent = {
  Message: 'Message',
  Join: 'Join',
  Leave: 'Leave',
  Submit: 'Submit',
  Accepted: 'Accepted',
  Complete: 'Complete',
} as const;
type ChatEvent = (typeof ChatEvent)[keyof typeof ChatEvent];
