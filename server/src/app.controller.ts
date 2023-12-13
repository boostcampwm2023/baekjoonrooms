import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { SessionAuthGuard } from './auth/auth.guard';
import User from './entities/user.entity';
import { RoomService } from './room/room.service';
import { isUserSession, UserSession } from './types/userSession';

@UseGuards(SessionAuthGuard)
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly roomService: RoomService,
  ) {}

  @Get()
  getHello(): string {
    // this.logger.log('get hello world');
    return this.appService.getHello();
  }

  @Get('session')
  async getSession(@Req() req: Request): Promise<UserSession> {
    const user = req.user as User;

    if (user && isUserSession(user)) {
      const userSession: UserSession = {
        provider: user.provider,
        providerId: user.providerId,
        avatarUrl: user.avatarUrl,
        username: user.username,
        isHost: false,
      };

      const joinedRooms = await user.joinedRooms;
      if (joinedRooms != null && joinedRooms.length > 0) {
        const room = joinedRooms[0].room;
        userSession.participatingRoomCode = room.code;
        const host = await room.host;

        if (host != null && host.id === user.id) {
          userSession.isHost = true;
        }
      }
      return userSession;
    }

    throw new BadRequestException('User not found!');
  }
}
