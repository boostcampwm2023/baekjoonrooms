import { apiClient } from './apiClient';

export async function getAuthStatus(): Promise<boolean | undefined> {
  try {
    const { data }: { data: boolean } = await apiClient.get('/auth/status');
    return data;
  } catch (error) {
    console.log(error);
  }
}
