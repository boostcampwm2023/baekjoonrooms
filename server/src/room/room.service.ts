import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { SubmissionService } from 'src/submission/submission.service';
import { Repository } from 'typeorm';
import Room from '../entities/room.entity';
import User from '../entities/user.entity';
import { RankingResponseDto } from '../room-user/dto/ranking-response.dto';
import RoomUser from '../room-user/room-user.entity';
import { RoomUserService } from '../room-user/room-user.service';
import { SocketService } from '../socket/socket.service';
import { SubmissionStatDto } from '../submission/submission.service';
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
    @Inject(forwardRef(() => SubmissionService))
    private readonly submissionService: SubmissionService,
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

    if (user.username == null)
      throw new BadRequestException('username이 없습니다.');
    const code = await this.createRoomCode(user.username);

    this.logger.log(`creating room ${code}...`);
    const room = new Room();
    room.code = code;
    room.host = Promise.resolve(user);
    room.isStarted = false;
    await this.roomRepository.save(room);
    this.logger.log(`room ${code} successfully created by ${user.username}!`);

    await this.roomUserService.create({ room, user });
    this.socketService.notifyCreatingRoom(user.username, room.code);
    return room;
  }

  async createRoomCode(username: string) {
    const currentTime = Date.now();
    const hashSource = `${username}${currentTime}`;
    const hash = crypto.createHash('sha256').update(hashSource).digest('hex');
    return hash.substring(0, 6).toUpperCase();
  }

  async joinRoom(user: User, roomCode: string) {
    const joinedRooms = await user.joinedRooms;

    if (joinedRooms != null && joinedRooms.length !== 0) {
      throw new BadRequestException('이미 참가한 방이 있습니다.');
    }

    const roomUsers =
      await this.roomUserService.findRoomUsersByRoomCode(roomCode);

    if (roomUsers.length === 0) {
      throw new BadRequestException('존재하지 않는 방입니다.');
    }
    const room = roomUsers[0].room;
    if (room == null) {
      throw new InternalServerErrorException('방을 찾을 수 없습니다.');
    }
    this.logger.debug(`user ${user.username} joining room ${room.code}...`);
    await this.roomUserRepository.create({ room, user }).save();
    this.socketService.notifyJoiningRoom(user.username, room);
  }

  async destroyRoom(room: Room) {
    this.logger.log(`destroying room: ${room.code}`);
    return await this.roomRepository.remove(room);
  }

  async exitRoom(user: User) {
    const joinedRooms = await user.joinedRooms;
    if (joinedRooms == null) {
      throw new InternalServerErrorException(
        '참가 중인 방을 찾을 수 없습니다.',
      );
    }

    if (joinedRooms.length > 1)
      throw new InternalServerErrorException('참가 중인 방이 여러 개입니다.');

    const roomUser = joinedRooms[0];

    await this.roomUserRepository.remove(roomUser);

    const room = roomUser.room;
    if (room == null) {
      throw new InternalServerErrorException('방을 찾을 수 없습니다.');
    }

    await this.socketService.notifyExit(user.username, room);

    const numberOfJoinedUsers = (await room.joinedUsers)?.length;
    if (numberOfJoinedUsers == null || numberOfJoinedUsers === 0) {
      await this.destroyRoom(room);
    }
  }

  async findRoomByCode(code: string) {
    const room = await this.roomRepository.findOne({ where: { code } });
    if (!room) {
      throw new BadRequestException('존재하지 않는 방입니다.');
    }
    return room;
  }

  async getUsersRankingByRoomCode(code: string) {
    const users = await this.roomUserService.findUsersByRoomCode(code);

    const stats =
      await this.submissionService.getSubmissionsByRoomCodeGroupByUsers(code);

    const statsMap = stats.reduce((acc, stat) => {
      acc.set(stat.userId, stat);
      return acc;
    }, new Map<number, SubmissionStatDto>());

    const rankings: RankingResponseDto[] = users.map((user) => {
      const count = parseInt(statsMap.get(user.id)?.count ?? '0') || 0;

      return {
        id: user.id,
        username: user.username,
        numberOfProblemsSolved: count,
        mostRecentCorrectSubmissionTime:
          statsMap.get(user.id)?.latestSubmittedAt ?? '',
      };
    });

    return rankings;
  }
}
