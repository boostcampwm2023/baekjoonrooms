import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { isNil } from 'src/common/utils';
import { DataSource, Repository } from 'typeorm';
import { Status } from '../const/boj-results';
import Room from '../entities/room.entity';
import Submission from '../entities/submission.entity';
import User from '../entities/user.entity';
import RoomUser from '../room-user/room-user.entity';
import { RoomUserService } from '../room-user/room-user.service';
import { SocketService } from '../socket/socket.service';
import { UserService } from '../user/user.service';

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
    private readonly socketService: SocketService,
    private dataSource: DataSource,
  ) {}

  /**
   * create room if the user does not have any joined rooms
   * @param user
   */
  async createRoom(user: User) {
    const joinedRooms = await this.userService.findJoinedRooms(user);
    if (joinedRooms.length !== 0) {
      throw new BadRequestException('이미 참가한 방이 있습니다.');
    }

    if (isNil(user.username))
      throw new BadRequestException('username이 없습니다.');
    const code = await this.createRoomCode(user.username);

    const room = await this.dataSource.transaction(async (manager) => {
      const room = new Room();
      room.code = code;
      room.host = user;
      room.isStarted = false;
      await manager.save(room);

      const roomUser = new RoomUser();
      roomUser.room = room;
      roomUser.user = user;
      await manager.save(roomUser);

      this.socketService.notifyCreatingRoom(user.username, room.code);

      return room;
    });
    return room;
  }

  async createRoomCode(username: string) {
    const currentTime = Date.now();
    const hashSource = `${username}${currentTime}`;
    const hash = crypto.createHash('sha256').update(hashSource).digest('hex');
    return hash.substring(0, 6).toUpperCase();
  }

  async joinRoom(user: User, roomCode: string) {
    const joinedRooms = await RoomUser.find({
      where: {
        user: { id: user.id },
      },
      relations: ['room', 'user'],
    });

    if (joinedRooms != null && joinedRooms.length !== 0) {
      throw new BadRequestException('이미 참가한 방이 있습니다.');
    }

    const roomUsers = await RoomUser.find({
      where: {
        room: { code: roomCode },
      },
      relations: ['room', 'user'],
    });

    if (roomUsers.length === 0) {
      throw new BadRequestException(`No one is in the room ${roomCode}.`);
    }

    const room = roomUsers[0].room;
    this.logger.debug(`user ${user.username} joining room ${room.code}...`);

    this.socketService.notifyJoiningRoom(user.username, room);
    return await RoomUser.create({ room, user }).save();
  }

  async exitRoom(user: User) {
    return this.dataSource.transaction(async (manager) => {
      const joinedRooms = await manager.find(RoomUser, {
        where: {
          user: { id: user.id },
        },
        relations: ['room', 'room.joinedUsers', 'room.host', 'room.problems'],
      });

      if (isNil(joinedRooms) || joinedRooms.length === 0) {
        throw new InternalServerErrorException(
          '참가 중인 방을 찾을 수 없습니다.',
        );
      }

      if (joinedRooms.length > 1) {
        throw new InternalServerErrorException('참가 중인 방이 여러 개입니다.');
      }

      const roomUser = joinedRooms[0];
      const room = roomUser.room;
      if (isNil(room)) {
        throw new InternalServerErrorException('roomUser에 room이 없습니다.');
      }

      await this.socketService.notifyExit(user.username, room);

      await manager.remove(roomUser);
      if (room?.joinedUsers?.length === 1) {
        await manager.remove(room);
      }
    });
  }

  async findRoomByCode(code: string) {
    const room = await this.roomRepository.findOne({ where: { code } });
    if (!room) {
      throw new BadRequestException('존재하지 않는 방입니다.');
    }
    return room;
  }

  /**
   * returns an array of user id, username, and the number of accepted problems of the user, sorted by the number of accepted problems
   * @param code
   */
  async getRoomRankings(code: string) {
    Submission;
    User;
    const qb = this.roomRepository
      .createQueryBuilder('room')
      .where('room.code = :code', { code })
      .innerJoin('room.joinedUsers', 'roomUser')
      .innerJoin('roomUser.user', 'user')
      .innerJoin(
        'room.submissions',
        'submission',
        'submission.status = :status AND submission.user_id = user.id AND submission.alreadyAccepted = false',
        {
          status: Status.ACCEPTED,
        },
      )
      .select('user.id', 'userId')
      .addSelect('user.username', 'username')
      .addSelect('COUNT(submission.id)', 'acceptedCount')
      .addSelect('MAX(submission.submittedAt)', 'lastAcceptedAt')
      .groupBy('user.id')
      .orderBy('acceptedCount', 'DESC')
      .addOrderBy('lastAcceptedAt', 'ASC');

    const data = await qb.getRawMany();
    return { data };
  }
}
