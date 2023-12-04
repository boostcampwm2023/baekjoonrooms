import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import RoomUser from 'src/entities/roomUser.entity';
import { Repository } from 'typeorm';
import { CreateRoomUserInput } from 'src/types/roomUser';

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
