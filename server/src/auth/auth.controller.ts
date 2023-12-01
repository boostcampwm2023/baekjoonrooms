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
  async authCallback(@Req() req: Request, @Res() res: Response) {
    this.logger.debug('authCallback...');
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }

  @Post('mock')
  @UseGuards(MockAuthGuard)
  async mockLogin() {
    this.logger.debug('MockAuthGuard passed!');
    // res.redirect(`${process.env.CLIENT_URL}/home`);
    return 'mock user login successful!';
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
