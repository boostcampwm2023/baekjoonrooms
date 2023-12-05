import axios from 'axios';
import { CreateUser } from '../types/CreateUserType';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

export async function getSession(): Promise<CreateUser> {
  const response = await axios.get(`${VITE_BASE_URL}/session`, {
    withCredentials: true,
  });

  return response.data;
}

export async function logout() {
  axios.get(`${VITE_BASE_URL}/auth/logout`, { withCredentials: true });
}
