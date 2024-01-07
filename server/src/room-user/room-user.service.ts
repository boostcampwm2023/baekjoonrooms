import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoomUser from 'src/entities/room-user.entity';
import User from 'src/entities/user.entity';
import { RoomUserInput } from 'src/types/room-user-input';
import { Repository } from 'typeorm';

@Injectable()
export class RoomUserService {
  constructor(
    @InjectRepository(RoomUser)
    private readonly roomUserRepository: Repository<RoomUser>,
  ) {}

  async create(roomUserInput: RoomUserInput) {
    return this.roomUserRepository.create(roomUserInput).save();
  }

  async remove(roomUser: RoomUser) {
    return this.roomUserRepository.remove(roomUser);
  }

  async findRoomUserByUser(user: User) {
    return this.roomUserRepository.findOne({
      where: { user: { id: user.id } },
    });
  }

  async findRoomUsersByRoomCode(roomCode: string) {
    return this.roomUserRepository.find({
      where: { room: { code: roomCode } },
    });
  }
}
