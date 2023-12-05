import { RoomCreateType } from '../types/RoomCreateType';
import { apiClient } from './apiClient';

export async function createRoom(): Promise<RoomCreateType | undefined> {
  try {
    const { data } = await apiClient.post('/session', {});
    return data;
  } catch (error) {
    console.log(error);
  }
}
