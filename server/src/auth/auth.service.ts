import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';
import { ProviderInfo } from 'src/types/user';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService) {}

  async validateMockUser(username: string, password: string): Promise<User> {
    const mockProviderInfo: ProviderInfo = {
      provider: username,
      providerId: password,
    };
    const user =
      await this.userService.findUserByProviderInfo(mockProviderInfo);

    if (user == null) {
      this.logger.debug('잘못된 로그인 요청입니다!');
      throw new BadRequestException('잘못된 로그인 요청입니다!');
    }

    return user;
  }
}
