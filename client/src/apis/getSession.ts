import { CreateUser } from '../types/CreateUserType';
import { apiClient } from './apiClient';

export async function getSession(): Promise<CreateUser | undefined> {
  try {
    const { data }: { data: CreateUser } = await apiClient.get('/session');
    return data;
  } catch (error) {
    console.log(error);
  }
}
