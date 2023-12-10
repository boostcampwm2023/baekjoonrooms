import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatEvent, MessageInterface } from '../types/MessageInterface';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';
import { SessionAuthGuard } from 'src/auth/auth.guard';
import { WebsocketExceptionsFilter } from './socket.filter';
import { Status } from '../const/bojResults';

export type GameStartInfo = {
  problems: string[];
  endTime: string;
};

@WebSocketGateway({
  cors: {
    origin: [
      process.env.CLIENT_HTTP_URL,
      process.env.CLIENT_HTTPS_URL,
      process.env.CLIENT_URL,
      'http://localhost:4000',
    ],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
@UseFilters(WebsocketExceptionsFilter)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server!: Server;

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly userService: UserService) {}

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      const user = this.getUser(client);
      const message: Partial<MessageInterface> = {
        username: 'system',
        body: `${user.username}님이 퇴장하셨습니다.`,
        timestamp: Date.now(),
        chatEvent: ChatEvent.Leave,
      };
      const joinedRoom = await this.userService.getJoinedRoom(user);
      const roomCode = joinedRoom.room.code;
      this.logger.log(
        `client ${user.username} leaving room ${roomCode} and disconnecting...`,
      );
      this.server.to(roomCode).emit('chat-message', message);
    } catch (e) {
      if (e instanceof WsException) {
        this.logger.error('--> ws: error while disconnecting...');
        this.logger.error(e);
        this.logger.error('<-- ws: error caught...');
      }
    }
  }

  @UseGuards(SessionAuthGuard)
  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const user = this.getUser(client);
      this.logger.debug(`client ${user.username} connecting...`);
      const joinedRoom = await this.userService.getJoinedRoom(user);

      const roomCode = joinedRoom.room.code;
      this.logger.log(`client ${user.username} joining room ${roomCode}`);
      client.join(roomCode);

      const message: Partial<MessageInterface> = {
        username: 'system',
        body: `${user.username}님이 입장하셨습니다.`,
        timestamp: Date.now(),
        chatEvent: ChatEvent.Join,
      };
      this.server.to(roomCode).emit('chat-message', message);
    } catch (e) {
      this.logger.error('--> ws: error while connecting and joining room...');
      this.logger.error(e);
      this.logger.error('<-- ws: error caught...');
    }
  }

  @SubscribeMessage('chat-message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: MessageInterface,
  ) {
    const user = this.getUser(client);
    const joinedRoom = await this.userService.getJoinedRoom(user);
    const roomCode = joinedRoom.room.code;
    this.logger.debug(
      `--> ws: ${user.username} in room ${roomCode} sent message:`,
      message,
    );

    if (this.server == null) throw new WsException('server is null');

    this.logger.debug(`--> ws: chat-message ${message.body}`);
    this.server.to(roomCode).emit('chat-message', message);
  }

  @SubscribeMessage('game-start')
  async handleGameStart(@ConnectedSocket() client: Socket) {
    const user = this.getUser(client);
    const joinedRoom = await this.userService.getJoinedRoom(user);
    this.logger.debug(
      `--> ws: game-start of room ${joinedRoom.room.host} from ${user.username}`,
    );

    const host = await joinedRoom.room.host;
    if (host == null) throw new WsException('host is null');
    if (host.id !== user.id) {
      throw new WsException('방장이 아닙니다.');
    }

    const problems = await joinedRoom.room.problems;
    if (problems == null) throw new WsException('problems is null');
    if (problems.length === 0) {
      throw new WsException('문제가 없습니다.');
    }

    if (this.server == null) throw new WsException('server is null');
    const roomCode = joinedRoom.room.code;

    const message: GameStartInfo = {
      problems: problems.map((problem) => problem.bojProblemId.toString()),
      endTime: joinedRoom.room?.endAt?.toISOString() ?? '',
    };

    this.logger.debug(`<-- ws: game-start ${message.toString()}`);
    this.server.to(roomCode).emit('game-start', message);
  }

  getUser(client: Socket): User {
    const request = client.request as any;
    if (request == null) throw new WsException('request is null');
    const user = request.user;
    if (user == null) throw new WsException('user is null');
    return user as User;
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
}
