import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import Room from 'src/entities/room.entity';
import User from 'src/entities/user.entity';
import { RoomUserService } from 'src/roomUser/room.user.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as util from 'util';
import RoomUser from '../entities/roomUser.entity';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    private readonly userService: UserService,
    private readonly roomUserService: RoomUserService,
    @InjectRepository(RoomUser)
    private readonly roomUserRepository: Repository<RoomUser>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(userSession: User) {
    const { provider, providerId } = userSession;

    const user = await this.userService.findUserByProviderInfoWithRooms({
      provider,
      providerId,
    });

    if (!user) {
      throw new InternalServerErrorException('유저를 찾을 수 없습니다.');
    }
    if (user.joinedRooms && user.joinedRooms.length > 0)
      throw new BadRequestException('이미 방에 참가 중입니다.');
    if (user.username == null)
      throw new BadRequestException('username이 없습니다.');

    const code = await this.createRoomCode(user.username);
    const room = await this.roomRepository
      .create({
        code,
        host: user,
      })
      .save();
    await this.roomUserService.createOrRestoreRoomUser({ room, user });

    return room;
  }

  async createRoomCode(username: string) {
    const currentTime = Date.now();
    const hashSource = `${username}${currentTime}`;
    const hash = crypto.createHash('sha256').update(hashSource).digest('hex');
    return hash.substring(0, 6).toUpperCase();
  }

  async joinRoom(userSession: User, roomCode: string) {
    const { provider, providerId } = userSession;

    const user = await this.userService.findUserByProviderInfo({
      provider,
      providerId,
    });
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    const roomUser = await this.roomUserService.findRoomUserByUser(user);

    if (roomUser) {
      throw new BadRequestException('이미 참가한 방이 있습니다.');
    }

    const roomUsers = await this.roomUserRepository.find({
      where: { room: { code: roomCode } },
    });

    if (roomUsers.length === 0) {
      throw new BadRequestException('존재하지 않는 방입니다.');
    }

    const room = roomUsers[0].room;

    if (room == null) {
      throw new InternalServerErrorException('방을 찾을 수 없습니다.');
    }

    this.logger.debug(`user ${user.username} joining room ${room.code}...`);
    return this.roomUserRepository.create({ room, user }).save();
  }

  async destroyRoom(room: Room) {
    this.logger.debug(`destroying room: ${room.code}`);
    return await this.roomRepository.remove(room);
  }

  async exitRoom(userSession: User) {
    const { provider, providerId } = userSession;

    const user = await this.userService.findUserByProviderInfoWithRooms({
      provider,
      providerId,
    });
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    this.logger.debug('user from db:', util.inspect(user));

    if (!user.joinedRooms || user.joinedRooms.length === 0)
      throw new BadRequestException('참가 중인 방이 없습니다.');

    if (user.joinedRooms.length > 1)
      throw new InternalServerErrorException('참가 중인 방이 여러 개입니다.');

    const roomUser = user.joinedRooms[0];
    await this.roomUserRepository.remove(roomUser);

    const room = roomUser.room;
    if (room == null) {
      throw new InternalServerErrorException('방을 찾을 수 없습니다.');
    }

    const numberOfJoinedUsers = await this.roomUserRepository.count({
      where: { room: { id: room.id } },
    });

    if (numberOfJoinedUsers === 0) {
      await this.destroyRoom(room);
    }
  }

  async findRoomParticipating(user: User) {
    const roomUser = await this.roomUserService.findRoomUserByUser(user);
    if (!roomUser) {
      this.logger.warn(
        `user ${user.username} is not participating in any room!`,
      );
      return null;
    }
    return this.roomRepository.findOne({
      where: {
        joinedUsers: { id: roomUser.id },
      },
    });
  }
}
