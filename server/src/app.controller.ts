import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { SessionAuthGuard } from './auth/auth.guard';

@UseGuards(SessionAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // this.logger.log('get hello world');
    return this.appService.getHello();
  }

  @Get('session')
  getSession(@Req() req: Request) {
    return req.user;
  }
}
