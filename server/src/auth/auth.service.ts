import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isNil } from 'src/common/utils';
import User from '../entities/user.entity';
import { ProviderInfo } from '../types/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService) {}

  async validateMockUser(username: string, password: string): Promise<User> {
    const mockProviderInfo: ProviderInfo = {
      provider: username,
      providerId: password,
    };

    if (!username.startsWith('mock')) {
      this.logger.error('username must start with "mock"');
      throw new BadRequestException('잘못된 로그인 요청입니다!');
    }

    const user =
      await this.userService.findUserByProviderInfo(mockProviderInfo);

    if (isNil(user)) {
      this.logger.debug('잘못된 로그인 요청입니다!');
      throw new BadRequestException('잘못된 로그인 요청입니다!');
    }

    return user;
  }
}
