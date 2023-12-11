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
import { Logger, UseFilters } from '@nestjs/common';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';
import { WebsocketExceptionsFilter } from './socket.filter';
import Room from 'src/entities/room.entity';
import * as util from 'util';
import { RoomInfo } from 'src/types/RoomInfo';
import { SocketService } from './socket.service';

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

  constructor(
    private readonly userService: UserService,
    private readonly socketService: SocketService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('socket gateway initialized');
    this.socketService.setServer(server);
  }

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
        body: `${user.username}님께서 연결되었습니다.`,
        timestamp: Date.now(),
        chatEvent: ChatEvent.Join,
      };
      this.server.to(roomCode).emit('chat-message', message);

      const roomInfo: RoomInfo = await this.socketService.makeRoomInfo(
        joinedRoom.room,
      );

      this.server.to(roomCode).emit('room-info', roomInfo);
    } catch (e) {
      this.logger.error('--> ws: error while connecting and joining room...');
      this.logger.error(e);
      this.logger.error('<-- ws: error caught...');
    }
  }

  @SubscribeMessage('game-start')
  async handleGameStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomInfo: RoomInfo,
  ) {
    const user = this.getUser(client);

    const joinedRoom = await this.userService.getJoinedRoom(user);
    const room: Room = joinedRoom.room;
    const host = await joinedRoom.room.host;

    if (host == null) throw new WsException('host is null');
    if (host.id !== user.id) {
      throw new WsException('방장이 아닙니다.');
    }

    this.logger.debug(`--> ws: game-start from ${user.username}`);

    const roomCode = joinedRoom.room.code;

    const message = {
      username: 'system',
      body: `${user.username}님이 게임을 시작하셨습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Message,
    };
    this.logger.debug(`<-- ws: chat-message ${util.inspect(message)}`);
    this.server.to(roomCode).emit('chat-message', message);

    if (roomInfo.duration == null) throw new WsException('duration is null');
    const now = new Date();
    const endTime = new Date(now.getTime() + roomInfo.duration * 60 * 1000);
    room.duration = roomInfo.duration;
    room.endAt = endTime;
    room.isStarted = true;
    await room.save();

    const roomInfoResponse = await this.socketService.makeRoomInfo(room);
    this.logger.debug(`<-- ws: room-info ${util.inspect(roomInfoResponse)}`);
    this.server.to(roomCode).emit('room-info', roomInfoResponse);
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

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      const user = this.getUser(client);

      const joinedRoom = await this.userService.getJoinedRoom(user);
      const roomCode = joinedRoom.room.code;
      this.logger.log(
        `client ${user.username} leaving room ${roomCode} and disconnecting...`,
      );

      const message: Partial<MessageInterface> = {
        username: 'system',
        body: `${user.username}님의 연결이 끊어졌습니다.`,
        timestamp: Date.now(),
        chatEvent: ChatEvent.Leave,
      };
      this.server.to(roomCode).emit('chat-message', message);
    } catch (e) {
      if (e instanceof WsException) {
        this.logger.error('--> ws: error while disconnecting...');
        this.logger.error(e);
        this.logger.error('<-- ws: error caught...');
      }
    }
  }
}
