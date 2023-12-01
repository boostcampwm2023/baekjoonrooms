import {
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GithubAuthGuard, MockAuthGuard, SessionAuthGuard } from './auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor() {}

  @Get('github')
  @UseGuards(GithubAuthGuard)
  async login() {
    this.logger.debug('login...');
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async authCallback(@Req() req: Request) {
    this.logger.debug('authCallback...');
    return "You've been authenticated.";
  }

  /**
   * Always login successfully.
   * /auth/mock/1 makes the user with id 1 logged in.
   */
  @Post('mock')
  @UseGuards(MockAuthGuard)
  async mockLogin() {
    this.logger.debug('MockAuthGuard passed!');
    return 'good!';
  }

  @Get('logout')
  @UseGuards(SessionAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    this.logger.debug('logout...');
    req.logout(() => {
      this.logger.debug('logout callback...');
      res.send('you are logged out.');
    });
  }
}
