import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  private readonly logger = new Logger(LocalSerializer.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user, done: CallableFunction) {
    this.logger.debug('serializing...', user);
    return done(null, user);
  }

  async deserializeUser(user, done: CallableFunction) {
    this.logger.debug('deserializing...', user);
    return done(null, user);
  }
}
