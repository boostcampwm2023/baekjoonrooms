export interface MessageInterface {
  timestamp: number;
  username: string;
  body: string;
  chatEvent: ChatEvent;
  color: string;
}

// export enum ChatEvent {
//   Message = 'Message',
//   Join = 'Join',
//   Leave = 'Leave',
//   Submit = 'Submit',
//   Accepted = 'Accepted',
//   Complete = 'Complete',
// }

const chatEvent = {
  Message: 'Message',
  Join: 'Join',
  Leave: 'Leave',
  Submit: 'Submit',
  Accepted: 'Accepted',
  Complete: 'Complete',
} as const;
type ChatEvent = (typeof chatEvent)[keyof typeof chatEvent];