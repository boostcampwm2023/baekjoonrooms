import { Module } from '@nestjs/common';
import { GithubStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { LocalSerializer } from './auth.serializer';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { GithubAuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [GithubStrategy, LocalSerializer, AuthService, GithubAuthGuard],
  controllers: [AuthController],
  imports: [UserModule, PassportModule],
})
export class AuthModule {}
