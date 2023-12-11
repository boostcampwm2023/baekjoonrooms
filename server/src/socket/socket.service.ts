import { Injectable, Logger } from '@nestjs/common';
import Room from '../entities/room.entity';
import { WsException } from '@nestjs/websockets';
import { RoomInfo } from '../types/RoomInfo';
import { Server } from 'socket.io';
import { Status } from '../const/bojResults';
import { ChatEvent, MessageInterface } from '../types/MessageInterface';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private server!: Server;

  setServer(server: Server) {
    this.server = server;
  }

  async makeRoomInfo(room: Room) {
    const roomUsers = await room.joinedUsers;

    if (roomUsers == null) throw new WsException('roomUsers is null');

    const host = await room.host;
    if (host == null) throw new WsException('host is null');

    const problems = await room.problems;
    if (problems == null) throw new WsException('problems is null');

    if (problems.length === 0) {
      this.logger.debug(`no problems in room ${room.code}`);
    }

    if (this.server == null) throw new WsException('server is null');

    const roomInfo: RoomInfo = {
      participantNames: roomUsers.map(
        (roomUser) => roomUser.user?.username || '',
      ),
      problems: problems.map((problem) => problem.bojProblemId.toString()),
      isStarted: room.isStarted,
      endTime: room.endAt,
      duration: room.duration,
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
          username: 'system',
          body: `${username}님이 ${problemId} 문제를 맞았습니다.`,
          timestamp: Date.now(),
          chatEvent: ChatEvent.Accepted,
          color: 'green',
        };
        break;
      case Status.WAITING:
        throw new WsException('status가 WAITING일 수 없습니다.');
      case Status.WRONG:
        message = {
          username: 'system',
          body: `${username}님이 ${problemId}를 틀렸습니다.`,
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
      username: 'system',
      body: `${username}님이 ${problemId} 문제를 제출하셨습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Submit,
      color: 'green',
    };
    this.server.to(roomCode).emit('chat-message', message);
  }

  async notifyExit(username: string, room: Room) {
    const code = room.code;

    const message: MessageInterface = {
      username: 'system',
      body: `${username}님이 방을 나가셨습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Leave,
      color: 'red',
    };
    this.server.to(code).emit('chat-message', message);

    const roomInfo: RoomInfo = await this.makeRoomInfo(room);
    this.server.to(code).emit('room-info', roomInfo);
  }
}
