import { Module } from '@nestjs/common';
import { GithubStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [GithubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
