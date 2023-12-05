import axios from 'axios';
import { ProblemResponse } from '../types/Problem';

export async function randomProblem(
  tagIds: number[],
  levels: number[],
  count: number,
): Promise<ProblemResponse[]> {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const tagIdsQuery = tagIds.join(',');
  const levelIdsQuery = levels.join(',');
  return await axios
    .get(
      `${VITE_BASE_URL}/problem/random?tagIds=${tagIdsQuery}&levels=${levelIdsQuery}&count=${count}`,
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
}
