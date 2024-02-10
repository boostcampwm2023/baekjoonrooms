import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { GithubAuthGuard, MockAuthGuard } from './auth.guard';
import { LocalSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { GithubStrategy, MockStrategy } from './auth.strategy';

@Module({
  providers: [
    GithubStrategy,
    GithubAuthGuard,
    MockAuthGuard,
    MockStrategy,
    AuthService,
    LocalSerializer,
  ],
  controllers: [AuthController],
  imports: [UserModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
