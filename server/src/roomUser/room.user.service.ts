import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoomUser from 'src/entities/roomUser.entity';
import User from 'src/entities/user.entity';
import { RoomUserInput } from 'src/types/roomUser';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(RoomUser)
    private readonly roomUserRepository: Repository<RoomUser>,
  ) {}

  async createOrRestoreRoomUser(roomUserInput: RoomUserInput) {
    const { room, user } = roomUserInput;
    const roomUser = await this.roomUserRepository.findOne({
      withDeleted: true,
      where: {
        room: { id: room.id },
        user: { id: user.id },
      },
    });

    return roomUser
      ? this.roomUserRepository.recover(roomUser)
      : this.roomUserRepository.create(roomUserInput).save();
  }

  async findRoomUserByUser(user: User) {
    return this.roomUserRepository.findOne({
      where: { user: { id: user.id } },
    });
  }
}
