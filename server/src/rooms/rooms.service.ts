import { Injectable, NotFoundException } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import Room from '../entities/room.entity';

@Injectable()
export class RoomsService {
  findAll() {
    return Room.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  async findUsers(roomCode: string) {
    const room = await Room.findOne({
      where: { code: roomCode },
      relations: ['joinedUsers', 'joinedUsers.user'],
    });

    if (isNil(room)) {
      throw new NotFoundException(`Room with code ${roomCode} not found`);
    }

    const joinedUsers = (await room.joinedUsers) ?? [];

    return { users: joinedUsers.map((joinedUser) => joinedUser.user) };
  }
}
