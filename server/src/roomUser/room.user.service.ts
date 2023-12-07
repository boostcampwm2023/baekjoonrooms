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
