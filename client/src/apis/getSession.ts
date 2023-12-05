import { apiClient } from './apiClient';

export async function getSession() {
  try {
    const { data } = await apiClient.get('/session');
    return data;
  } catch (error) {
    console.log(error);
  }
}
