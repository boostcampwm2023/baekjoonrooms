import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionAuthGuard } from '../auth/auth.guard';
import { RoomsService } from './rooms.service';

@ApiTags('rooms')
@UseGuards(SessionAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get('/:roomCode/users')
  findUsers(@Param('roomCode') roomCode: string) {
    return this.roomsService.findUsers(roomCode);
  }
}
