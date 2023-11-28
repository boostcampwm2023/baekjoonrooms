import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user, done: CallableFunction) {
    console.log('serializing...', user);
    return done(null, user);
  }

  async deserializeUser(user, done: CallableFunction) {
    console.log('deserializing...', user);
    return done(null, user);
  }
}
