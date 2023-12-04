import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create.room.dto';
import { RoomService } from './room.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('room')
@ApiTags('room')
export class RoomController {
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
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }
}
