import { apiClient } from './apiClient';

export async function logout() {
  try {
    await apiClient.get('/auth/logout');
  } catch (error) {
    console.log(error);
    throw error;
  }
}
