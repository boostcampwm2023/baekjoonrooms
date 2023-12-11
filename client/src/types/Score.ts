export interface Score {
  "username": string,
  "problemId": number,
  "status" : Status
}

export const Status = {
  ACCEPTED : "ACCEPTED",
  WRONG : "WRONG",
  WAITING : "WAITING"
} as const;

type Status = typeof Status[keyof typeof Status];