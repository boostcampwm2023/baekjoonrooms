import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';
import { ProviderInfo } from 'src/types/user';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService) {}

  async validateMockUsers(username: string, password: string): Promise<User> {
    const mockProviderInfo: ProviderInfo = {
      provider: username,
      providerId: password,
    };
    const user =
      await this.userService.findUserByProviderInfo(mockProviderInfo);

    if (user) {
      this.logger.debug(`Mock user ${username} found!`);
    } else {
      this.logger.debug(`Mock user ${username} not found!`);
    }
    return user;
  }
}
