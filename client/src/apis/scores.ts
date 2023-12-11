import { Score } from '../types/Score';
import { apiClient } from './apiClient';

export async function getScores(roomCode: string): Promise<Score[]> {
  try {
    const { data } = await apiClient.get('/submission', {
      params: {
        roomCode,
      },
    });
    return data;
  } catch (error) {
    throw new Error('getScores error');
  }
}
