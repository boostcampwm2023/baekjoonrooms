import { apiClient } from './apiClient';

export async function getScores(roomCode: string) {
  try {
    await apiClient.post('/DEV-THROW-WRONG-SUBMISSION', { roomCode: roomCode });
  } catch (error) {
    // console.log(error);
    // DEV MOCK DATA
    return [
        {
          "username": "user1",
          "problemId": 1000,
          "status" : "ACCEPTED"
        },
        {
          "username": "user2",
          "problemId": 1000,
          "status" : "ACCEPTED"
        },
        {
          "username": "user1",
          "problemId": 1001,
          "status" : "WRONG"
        }
      ];
  }
}
