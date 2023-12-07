import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as util from 'util';
import { UserSession } from '../types/userSession';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  private readonly logger = new Logger(LocalSerializer.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(userSession: UserSession, done: CallableFunction) {
    this.logger.debug('Serializing user:', util.inspect(userSession));
    return done(null, userSession);
  }

  async deserializeUser(userSession: UserSession, done: CallableFunction) {
    this.logger.debug('Deserializing userSession:', userSession);
    const { provider, providerId } = userSession;
    const user = await this.userService.findUserByProviderInfo({
      provider,
      providerId,
    });

    if (!user) {
      this.logger.error('User not found in the database!');
      throw new BadRequestException('User not found!');
    }

    return await done(null, user);
  }
}
