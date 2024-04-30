import { apiClient } from './apiClient';

export async function exitRoom() {
  try {
    await apiClient.post('/room/exit');
  } catch (error) {
    console.log(error);
    throw error;
  }
}
