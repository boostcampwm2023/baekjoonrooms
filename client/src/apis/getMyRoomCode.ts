import { apiClient } from './apiClient';

// eslint-disable-next-line
export async function getMyRoomCode(): Promise<any | undefined> {
  try {
    // eslint-disable-next-line
    const { data }: { data: any } = await apiClient.get('/users/me/room-code');
    return data.code;
  } catch (error) {
    console.log(error);
  }
}
