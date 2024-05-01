import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GithubAuthGuard, MockAuthGuard, SessionAuthGuard } from './auth.guard';
import { LoginDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor() {}

  @Get('/status')
  @ApiOperation({
    summary: 'Check Auth Status',
    description: 'Check if user is logged in.',
  })
  async checkAuthStatus(@Req() req: Request) {
    return req.isAuthenticated();
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  async login() {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async authCallback(@Req() req: Request, @Res() res: Response) {
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }

  @Post('mock')
  @UseGuards(MockAuthGuard)
  @ApiOperation({
    summary: 'Mock Login',
    description: 'Supports Mock Login for development purpose.',
  })
  async mockLogin(@Body() loginDto: LoginDto) {
    this.logger.debug('MockAuthGuard passed! loginDto: ', loginDto);
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
