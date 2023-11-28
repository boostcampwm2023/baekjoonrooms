import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { GithubAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('github')
  @UseGuards(GithubAuthGuard)
  async login() {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  @Redirect('http://localhost:5173/home')
  async authCallback(@Req() req) {
    return 'login success!';
  }
}
