import { RoomCreateType } from '../types/RoomCreateType';
import { apiClient } from './apiClient';

export async function createRoom(): Promise<RoomCreateType | undefined> {
  return await apiClient
    .post('/room', {
      userId: 1,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
