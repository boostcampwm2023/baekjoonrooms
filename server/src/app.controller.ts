import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionAuthGuard } from './auth/auth.guard';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(SessionAuthGuard)
  @Get('session')
  getSession(@Req() req: Request) {
    return req.user;
  }
}
