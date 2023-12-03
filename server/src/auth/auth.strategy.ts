import { PassportStrategy } from '@nestjs/passport';
import { Strategy as StrategyLocal } from 'passport-local';
import { ConfigService } from '@nestjs/config';
import { Strategy as StrategyGithub } from 'passport-github2';
import { Injectable, Logger } from '@nestjs/common';
import User from '../entities/user.entity';
import { GitHubProfile } from '../types/authProfiles';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(StrategyGithub, 'github') {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['public_profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: GitHubProfile) {
    const { username, provider, id, _json } = profile;
    const user: Partial<User> = {
      provider,
      providerId: id,
      username,
      avatarUrl: _json.avatar_url,
    };
    this.logger.debug('OAuth passed! Validating (upserting) user...', user);
    return user;
  }
}

@Injectable()
export class MockStrategy extends PassportStrategy(StrategyLocal) {
  private readonly logger = new Logger(MockStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
    this.logger.debug('MockStrategy.constructor');
  }

  async validate(username: string, password: string) {
    this.logger.debug(
      'Test whether (username, password) exists in the mock database...',
    );

    const user = this.authService.validateMockUsers(username, password);
    return user;
  }
}
