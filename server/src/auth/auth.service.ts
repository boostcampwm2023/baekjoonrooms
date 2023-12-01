import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
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

  async validateMockUsers(username: string, password: string): Promise<User> {
    const user = this.mockUsers.find(
      (user) => user.username === username && user.password === password,
    );
    if (user) {
      this.logger.debug(`Mock user ${username} found!`);
      const mockUser = new User();
      mockUser.username = user.username;
      mockUser.providerId = user.password;
      return mockUser;
    }
    this.logger.debug(`Mock user ${username} not found!`);
    return null;
  }
}
