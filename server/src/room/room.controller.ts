import { Controller, Logger, Param, Post, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import User from '../entities/user.entity';

@Controller('room')
@ApiTags('room')
export class RoomController {
  private readonly logger = new Logger(RoomController.name);

  constructor(private readonly roomService: RoomService) {}

  // TODO: USER가 없을 경우도 처리
  @ApiResponse({
    status: 400,
    description: '이미 참가하고 있는 방이 있는데 방 생성을 시도한 경우',
  })
  @Post()
  @ApiOperation({
    summary: '방 생성',
  })
  async createRoom(@Req() req: Request) {
    const user: User = req.user as User;
    this.logger.debug(`user creating room: ${user}`);
    return await this.roomService.createRoom(user);
  }

  @Post(':code')
  async joinRoom(@Param('code') code: string, @Req() req: Request) {
    const user: User = req.user as User;
    this.logger.debug(`user joining room: ${user} with code ${code}`);
    return await this.roomService.addUserToRoom(user, code);
  }
}
