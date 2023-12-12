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
      const userSession: UserSession = { ...(req.user as User) } as UserSession;
      const joinedRooms = await user.joinedRooms;

      if (joinedRooms != null && joinedRooms.length > 0) {
        userSession.participatingRoomCode = joinedRooms[0].room?.code;
      }
      return userSession;
    }

    throw new BadRequestException('User not found!');
  }
}
