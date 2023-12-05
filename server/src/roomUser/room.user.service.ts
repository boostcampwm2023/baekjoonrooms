import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoomUser from 'src/entities/roomUser.entity';
import { CreateRoomUserInput } from 'src/types/roomUser';
import { Repository } from 'typeorm';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(RoomUser)
    private readonly roomUserRepository: Repository<RoomUser>,
  ) {}

  async createOrRestoreRoomUser(createRoomUserInput: CreateRoomUserInput) {
    const { room, user } = createRoomUserInput;
    const roomUser = await this.roomUserRepository.findOne({
      withDeleted: true,
      where: {
        room: { id: room.id },
        user: { id: user.id },
      },
    });

    return roomUser
      ? this.roomUserRepository.recover(roomUser)
      : this.roomUserRepository.create(createRoomUserInput).save();
  }
}
