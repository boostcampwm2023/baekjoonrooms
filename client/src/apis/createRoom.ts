import axios from 'axios';
import { RoomCreateType } from '../types/RoomCreateType';

export async function createRoom(): Promise<RoomCreateType | undefined> {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

  return await axios
    .post(`${VITE_BASE_URL}/room`, {}, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
