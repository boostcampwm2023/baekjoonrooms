import { AxiosError } from 'axios';
import { RoomCreateType } from '../types/RoomCreateType';
import { apiClient } from './apiClient';

export async function createRoom(): Promise<RoomCreateType | undefined> {
  try {
    const { data } = await apiClient.post('/room', {});
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // TODO: 이거 session로직 수정되면 여기도 고쳐야 됨
      // 세션에서 현재 유저가 방에 참가중인지, 어떤 방에 참가중인지 정보를 받아 올 수 있어야 함
      alert(error.response!.data.message);
    }
  }
}
