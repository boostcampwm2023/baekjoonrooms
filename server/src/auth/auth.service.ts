import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
      this.logger.debug('유저가 존재하지 않습니다.');
      throw new InternalServerErrorException();
    }

    return user;
  }
}
