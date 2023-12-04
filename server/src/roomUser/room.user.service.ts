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

  async createRoomUser(createRoomUserInput: CreateRoomUserInput) {
    return this.roomUserRepository.create(createRoomUserInput).save();
  }
}
