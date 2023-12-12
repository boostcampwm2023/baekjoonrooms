import { Injectable, Logger } from '@nestjs/common';
import Room from '../entities/room.entity';
import { WsException } from '@nestjs/websockets';
import { RoomInfoType } from '../types/RoomInfo';
import { Server } from 'socket.io';
import { Status } from '../const/bojResults';
import { ChatEvent, MessageInterface } from '../types/MessageInterface';
import { ProblemType } from 'src/types/ProblemType';
import User from '../entities/user.entity';
import * as util from 'util';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemService } from '../problem/problem.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private server!: Server;

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly problemService: ProblemService,
    private readonly userService: UserService,
  ) {}

  setServer(server: Server) {
    this.server = server;
  }

  notifyCreatingRoom(username: string, roomCode: string) {
    const message: MessageInterface = {
      username: username,
      body: `님이 방을 만들었습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Join,
      color: 'green',
    };
    this.server.to(roomCode).emit('chat-message', message);
  }

  async notifyJoiningRoom(username: string, room: Room) {
    const message: MessageInterface = {
      username: username,
      body: `님이 방에 들어왔습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Join,
      color: 'green',
    };
    this.server.to(room.code).emit('chat-message', message);
  }

  async makeRoomInfo(room: Room) {
    const roomUsers = await room.joinedUsers;
    const host = await room.host;
    const problems = await room.problems;

    if (roomUsers == null) throw new WsException('roomUsers is null');
    if (host == null) throw new WsException('host is null');
    if (problems == null || problems.length === 0)
      throw new WsException('problems is null');

    const problemTypes: ProblemType[] = problems.map((problem) => {
      return {
        bojProblemId: problem.bojProblemId,
        title: problem.title!,
        level: problem.level!,
      };
    });

    const roomInfo: RoomInfoType = {
      participantNames: roomUsers.map(
        (roomUser) => roomUser.user?.username || '',
      ),
      problems: problemTypes,
      isStarted: room.isStarted,
      endTime: room.endAt?.valueOf(),
    };
    return roomInfo;
  }

  async notifySubmissionStatus(
    username: string,
    roomCode: string,
    problemId: string,
    status: Status,
  ) {
    let message: MessageInterface;

    switch (status) {
      case Status.ACCEPTED:
        message = {
          username: username,
          body: `님이 ${problemId} 문제를 맞았습니다.`,
          timestamp: Date.now(),
          chatEvent: ChatEvent.Accepted,
          color: 'green',
        };
        break;
      case Status.WAITING:
        throw new WsException('status가 WAITING일 수 없습니다.');
      case Status.WRONG:
        message = {
          username: username,
          body: `님이 ${problemId}를 틀렸습니다.`,
          timestamp: Date.now(),
          chatEvent: ChatEvent.Message,
          color: 'red',
        };
        break;
      default:
        throw new WsException('status가 알 수 없는 값입니다.');
    }

    this.server.to(roomCode).emit('chat-message', message);
  }

  async submitCode(username: string, roomCode: string, problemId: string) {
    const message: MessageInterface = {
      username: username,
      body: `님이 ${problemId} 문제를 제출하셨습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Submit,
      color: 'green',
    };
    this.server.to(roomCode).emit('chat-message', message);
  }

  async notifyExit(username: string, room: Room) {
    const code = room.code;

    const message: MessageInterface = {
      username: username,
      body: `님이 방을 나가셨습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Leave,
      color: 'red',
    };
    this.server.to(code).emit('chat-message', message);
    this.server.to(code).emit('room-info', await this.makeRoomInfo(room));
  }

  async gameStart(user: User, startingRoomInfo: RoomInfoType) {
    this.logger.debug(`--> ws: game-start from ${user.username}`);

    const roomUser = await this.userService.getSingleJoinedRoom(user);
    const room: Room = roomUser.room;

    // check if the user is the host of the room

    const host = await roomUser.room.host;
    if (host == null) throw new WsException('host is null');
    if (host.id !== user.id) {
      throw new WsException('방장이 아닙니다.');
    }

    this.logger.debug(util.inspect(startingRoomInfo));

    // update room entity properties: problems, isStarted, endAt

    const { problems, duration } = startingRoomInfo;
    if (problems == null) throw new WsException('problems is null');
    if (duration == null) throw new WsException('duration is null');
    const bojProblemIds = problems.map((problem) => problem.bojProblemId);
    room.problems =
      this.problemService.getProblemsByBojProblemIds(bojProblemIds);

    room.isStarted = true;
    room.endAt = new Date(Date.now() + duration * 60 * 1000);

    await this.roomRepository.save(room);

    const message = {
      username: user.username,
      body: `님이 게임을 시작하셨습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Message,
    };
    const roomInfo = await this.makeRoomInfo(room);

    this.logger.debug(`<-- ws: chat-message ${util.inspect(message)}`);
    this.logger.debug(`<-- ws: room-info ${util.inspect(roomInfo)}`);

    this.server.to(room.code).emit('chat-message', message);
    this.server.to(room.code).emit('room-info', roomInfo);
  }
}
