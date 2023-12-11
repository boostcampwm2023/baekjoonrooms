import { ProblemType } from '../types/ProblemType';

import { apiClient } from './apiClient';

export async function searchProblem(
  searchKeyword: string,
): Promise<ProblemType[]> {
  if (!searchKeyword) return Promise.resolve([]);

  try {
    const { data } = await apiClient.get('/problem', {
      params: {
        searchKeyword,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
