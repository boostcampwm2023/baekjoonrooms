export interface MessageInterface {
  timestamp: number;
  username: string;
  body: string;
  chatEvent: ChatEvent;
}

export const ChatEvent = {
  Message: 'Message',
  Join: 'Join',
  Leave: 'Leave',
  Submit: 'Submit',
  Accepted: 'Accepted',
  Wrong: 'Wrong',
} as const;
type ChatEvent = (typeof ChatEvent)[keyof typeof ChatEvent];
