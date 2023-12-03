import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';
import * as util from 'util';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  private readonly logger = new Logger(LocalSerializer.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    this.logger.debug('Serializing user:', util.inspect(user));
    return done(null, user);
  }

  /**
   * This function gets triggered everytime a client sends a request with a valid sid cookie.
   * @param {User} user - user object that is found in the session using sid.
   * @param done
   */
  async deserializeUser(user: User, done: CallableFunction) {
    this.logger.debug('Deserializing user:', user);
    this.logger.debug('Now accessible via req.user!');
    return done(null, user);
  }
}
