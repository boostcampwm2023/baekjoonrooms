import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SessionAuthGuard } from '../auth/auth.guard';
import User from '../entities/user.entity';
import { GetUser } from './decorators/user.decorator';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
import Room from '../entities/room.entity';

@UseGuards(SessionAuthGuard)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '유저 생성',
  })
  @ApiResponse({
    status: 400,
    description: '이미 존재하는 유저인 경우',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('/me')
  @ApiOperation({
    summary: '내 정보 조회',
  })
  async getMyInfo(@GetUser() user: any) {
    return user;
  }

  @Get('/me/room-code')
  @ApiOperation({
    summary: '내 방 코드 조회',
  })
  async getMyRoomCode(@GetUser() user: User) {
    return this.userService.getRoomIfJoined({ userId: user.id });
  }

  @Get('/me/room')
  @ApiOperation({
    summary: '내가 속한 방 조회',
  })
  async getMyRoom(@GetUser() user: User) {
    return this.userService.findUserByProviderInfoWithRooms({
      provider: user.provider,
      providerId: user.providerId,
    });
  }

  @Get('/me/room/:roomCode/am-i-host')
  @ApiOperation({
    summary: '내가 방장인지 조회',
  })
  async getMyRoomIsHost(
    @Param('roomCode') roomCode: string,
    @GetUser() user: User,
  ) {
    const room = await Room.findOne({
      where: { code: roomCode },
      relations: ['host'],
    });
    return { isHost: room?.host?.id === user.id };
  }
}
