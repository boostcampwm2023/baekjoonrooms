import { AxiosError } from 'axios';
import { UserSession } from '../types/UserSessionType';
import { apiClient } from './apiClient';

export async function getSession(): Promise<UserSession | undefined> {
  try {
    const { data }: { data: UserSession } = await apiClient.get('/session');
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 403) {
      // console.log('Login required');
    }
  }
}
