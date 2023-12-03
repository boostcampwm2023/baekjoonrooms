import { Module } from '@nestjs/common';
import { GithubStrategy, MockStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { LocalSerializer } from './auth.serializer';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { GithubAuthGuard, MockAuthGuard } from './auth.guard';

@Module({
  providers: [
    GithubStrategy,
    GithubAuthGuard,
    MockAuthGuard,
    // MockAuthGuard,

    // SessionAuthGuard,
    MockStrategy,

    AuthService,
    LocalSerializer,
  ],
  controllers: [AuthController],
  imports: [UserModule, PassportModule],
})
export class AuthModule {}
