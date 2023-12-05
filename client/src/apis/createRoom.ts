import axios from 'axios';
import { RoomCreateType } from '../types/RoomCreateType';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

export async function createRoom(): Promise<RoomCreateType | undefined> {
  const response = await axios.post(
    `${VITE_BASE_URL}/room`,
    {},
    { withCredentials: true },
  );

  return response.data;
}
