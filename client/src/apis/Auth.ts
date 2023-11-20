import axios from 'axios';
import { UserType } from '../types/UserType';

const config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL as string,
};

export async function login(): Promise<UserType> {
  const response = await axios.post(`${config.baseUrl}/auth/login`, {});
  return response.data;
}
