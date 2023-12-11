import { Score } from '../types/Score';
import { apiClient } from './apiClient';

export async function getScores(roomCode: string) : Promise<Score[]> {
  try {
    const {data} = await apiClient.post('/DEV-THROW-WRONG-SUBMISSION', { roomCode: roomCode });
    return data;
  } catch (error) {
    // console.log(error);
    // DEV MOCK DATA
    return [
        {
          "username": "mockuser1",
          "problemId": 1000,
          "status" : "ACCEPTED"
        },
        {
          "username": "mockuser2",
          "problemId": 1000,
          "status" : "ACCEPTED"
        },
        {
          "username": "mockuser1",
          "problemId": 1001,
          "status" : "WRONG"
        }
      ];
  }
}
