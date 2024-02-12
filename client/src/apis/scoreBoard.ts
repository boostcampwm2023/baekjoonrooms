import { apiClient } from './apiClient';
import { ScoreBoardInformation } from '../types/ScoreBoardInformation';

export async function getScoreBoardInformation(
  roomCode: string,
): Promise<ScoreBoardInformation> {
  try {
    const { data: submissionData } = await apiClient.get('/submission', {
      params: {
        roomCode,
      },
    });

    const { data: rankingData } = await apiClient.get('/submission/ranking', {
      params: {
        roomCode,
      },
    });

    return { submissions: submissionData, rankings: rankingData };
  } catch (error) {
    throw new Error('getScores error');
  }
}
