import { apiClient } from './apiClient';

export async function logout() {
  await apiClient.get('/auth/logout');
}
