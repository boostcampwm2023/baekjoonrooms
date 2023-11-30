import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { MockUser } from '../types/user';

@Injectable()
export class AuthService {
  private readonly mockUsers = [
    {
      username: 'mock1',
      password: 'mock1',
    },
    {
      username: 'mock2',
      password: 'mock2',
    },
    {
      username: 'mock3',
      password: 'mock3',
    },
  ];

  constructor(private userService: UserService) {}

  async validateMockUsers(
    username: string,
    password: string,
  ): Promise<MockUser> {
    const user = this.mockUsers.find(
      (user) => user.username === username && user.password === password,
    );
    if (user) {
      return user;
    }
    return null;
  }
}
