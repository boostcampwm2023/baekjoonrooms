import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import Room from 'src/entities/room.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import User from 'src/entities/user.entity';
import * as util from 'util';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly userService: UserService,
  ) {}

  async createRoom(userSession: User) {
    const { provider, providerId } = userSession;

    const user = await this.userService.findUserByProviderInfo({
      provider,
      providerId,
    });
    this.logger.debug('user from db:', util.inspect(user));
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');
    if (user.joinedRooms && user.joinedRooms.length > 0)
      throw new BadRequestException('이미 방에 참가 중입니다.');
    if (user.username == null)
      throw new BadRequestException('username이 없습니다.');

    const roomCode = await this.createRoomCode(user.username);

    return this.roomRepository
      .create({ code: roomCode, host: user, users: [user] })
      .save();
  }

  async createRoomCode(username: string) {
    const currentTime = Date.now();
    const hashSource = `${username}${currentTime}`;
    const hash = crypto.createHash('sha256').update(hashSource).digest('hex');
    return hash.substring(0, 6).toUpperCase();
  }

  async addUserToRoom(userSession: User, roomCode: string) {
    const { provider, providerId } = userSession;
    const user = await this.userService.findUserByProviderInfo({
      provider,
      providerId,
    });

    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    const room = await this.roomRepository.findOne({
      where: { code: roomCode },
    });

    if (!room) {
      this.logger.debug(`room with ${roomCode} does not exist!`);
      throw new BadRequestException('존재하지 않는 방입니다.');
    }

    if (
      room.users?.find(
        (user) => user.providerId === providerId && user.provider === provider,
      )
    )
      throw new BadRequestException('이미 참가한 방입니다.');

    if (room.users) {
      room.users.push(user);
    } else {
      room.users = [user];
    }

    return room.save();
  }

  async exitRoom(userSession: User) {
    const { provider, providerId } = userSession;

    const user = await this.userService.findUserByProviderInfo({
      provider,
      providerId,
    });

    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    this.logger.debug('user from db:', util.inspect(user));

    if (!user.joinedRooms || user.joinedRooms.length === 0)
      throw new BadRequestException('참가 중인 방이 없습니다.');

    if (user.joinedRooms.length > 1)
      throw new InternalServerErrorException('참가 중인 방이 여러 개입니다.');

    const roomId = user.joinedRooms[0].id;
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['users'],
    });

    if (!room) {
      throw new InternalServerErrorException('방을 찾을 수 없습니다.');
    }

    if (!room.users) {
      throw new InternalServerErrorException('방에 참가한 유저가 없습니다.');
    }

    // room and user delete each other
    room.users.filter((user) => user.id !== userSession.id);
    user.joinedRooms = [];

    await Promise.all([user.save(), room.save()]);
  }
}
