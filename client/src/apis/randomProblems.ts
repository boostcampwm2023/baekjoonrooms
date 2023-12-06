import { apiClient } from './apiClient';
import { ProblemResponse } from '../types/Problem';

export async function randomProblem(
  tagIds: number[],
  levels: number[],
  count: number,
): Promise<ProblemResponse[]> {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const tagIdsQuery = tagIds.join(',');
  const levelIdsQuery = levels.join(',');
  try {
    const {data} = await apiClient
    .get(
      `${VITE_BASE_URL}/problem/random?tagIds=${tagIdsQuery}&levels=${levelIdsQuery}&count=${count}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('문제를 불러오는데 실패했습니다.');
  }
}