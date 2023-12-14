import { apiClient } from './apiClient';

export async function joinRoom(roomCode: string) {
  try {
    await apiClient.post('/room/join', { code: roomCode });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
