import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { SessionAuthGuard } from './auth/auth.guard';

@UseGuards(SessionAuthGuard)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER)
    // private readonly logger: Logger,
  ) {
    // (logger as unknown as WinstonLogger).setContext(AppController.name);
  }

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
