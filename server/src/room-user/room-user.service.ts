import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { RoomUserInput } from '../types/room-user-input';
import RoomUser from './room-user.entity';

@Injectable()
export class RoomUserService {
  private readonly logger = new Logger(RoomUserService.name);

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

  async findUsersByRoomCode(code: string) {
    const qb = this.roomUserRepository
      .createQueryBuilder('roomUser')
      .innerJoin('roomUser.room', 'room', 'room.code = :code', { code })
      .innerJoinAndSelect('roomUser.user', 'user');

    const roomUsers = await qb.getMany();

    return roomUsers.map((roomUser) => roomUser.user);
  }
}
