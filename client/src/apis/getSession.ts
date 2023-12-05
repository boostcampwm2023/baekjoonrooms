import { apiClient } from './apiClient';

export async function getSession() {
  const { data } = await apiClient.get('/session');
  return data;
}
