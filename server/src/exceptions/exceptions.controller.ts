import { BadRequestException, Controller, Get } from '@nestjs/common';

@Controller('exceptions')
export class ExceptionsController {
  @Get()
  raiseException() {
    throw new BadRequestException('This is a sample exception.');
  }
}
