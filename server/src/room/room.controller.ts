import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create.room.dto';
import { UserService } from 'src/user/user.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }
}
