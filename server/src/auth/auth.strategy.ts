import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import User from '../entities/user.entity';
import { GitHubProfile } from '../types/authProfiles';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['public_profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: GitHubProfile) {
    console.log(profile);
    const { username, provider, id, profileUrl, _json } = profile;
    console.log(
      'got github profile! create or get user and set up on the session',
    );
    const user: Partial<User> = {
      provider,
      providerId: id,
      username,
      avatarUrl: _json.avatar_url,
    };
    return user;
  }
}
