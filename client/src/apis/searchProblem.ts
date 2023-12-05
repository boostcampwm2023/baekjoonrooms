import axios from 'axios';
import { ProblemResponse } from '../types/Problem';

export async function searchProblem(searchKeyword: string): Promise<ProblemResponse[]> {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

  if(!searchKeyword) return Promise.resolve([]);

  return await axios
    .get(`${VITE_BASE_URL}/problem`, {
      params: {
        searchKeyword,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}
