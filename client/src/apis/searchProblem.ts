import axios from 'axios';

export interface Problem {
  bojProblemId: number;
  id: number;
  level: number;
  title: string;
}

export async function searchProblem(searchKeyword: string): Promise<Problem[]> {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

  if(!searchKeyword) return Promise.resolve([]);

  return await axios
    .get(`${VITE_BASE_URL}/problem`, {
      params: {
        searchKeyword,
      },
    })
    .then((res) => {
      return res.data || [];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}
