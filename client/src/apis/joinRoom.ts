import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

export async function joinRoom(roomCode: string) {
  await axios.post(
    `${VITE_BASE_URL}/room/join`,
    { code: roomCode },
    {
      withCredentials: true,
    },
  );
}
