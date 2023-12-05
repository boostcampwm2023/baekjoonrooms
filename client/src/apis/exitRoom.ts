import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

export async function exitRoom() {
  await axios.post(`${VITE_BASE_URL}/room/exit`, {}, { withCredentials: true });
}
