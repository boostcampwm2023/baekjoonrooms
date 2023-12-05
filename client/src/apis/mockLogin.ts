import { apiClient } from './apiClient';

type mockUser = {
  username: string;
  password: string;
};

export async function mockLoginApi(mockUser: mockUser) {
  try {
    return await apiClient.post('/auth/mock', mockUser);
  } catch (error) {
    console.log(error);
  }
}
