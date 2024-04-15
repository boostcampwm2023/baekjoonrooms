import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SessionAuthGuard } from '../auth/auth.guard';
import User from '../entities/user.entity';
import { GetUser } from './decorators/user.decorator';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';

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
}
