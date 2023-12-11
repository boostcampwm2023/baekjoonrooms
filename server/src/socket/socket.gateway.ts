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
import { RoomInfoType } from 'src/types/RoomInfo';
import { SocketService } from './socket.service';
import { ProblemService } from 'src/problem/problem.service';

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
    private readonly problemService: ProblemService,
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
        username: user.username,
        body: `님께서 연결되었습니다.`,
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

  @SubscribeMessage('game-start')
  async handleGameStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomInfo: RoomInfoType,
  ) {
    const user = this.getUser(client);

    const joinedRoom = await this.userService.getJoinedRoom(user);
    const room: Room = joinedRoom.room;
    const host = await joinedRoom.room.host;

    if (host == null) throw new WsException('host is null');
    if (host.id !== user.id) {
      throw new WsException('방장이 아닙니다.');
    }

    // reflect roomInfo to the actual room entity in db

    const { problems, duration, isStarted } = roomInfo;
    if (problems == null) throw new WsException('problems is null');
    if (isStarted == null) throw new WsException('isStarted is null');
    if (duration == null) throw new WsException('duration is null');

    room.endAt = new Date(Date.now() + duration * 60 * 1000);
    const problemEntities = await this.problemService.getProblemsByIds(
      problems.map((problem) => problem.bojProblemId),
    );
    room.problems = Promise.resolve(problemEntities);
    room.isStarted = true;
    room.save();

    const roomCode = joinedRoom.room.code;

    this.logger.debug(`--> ws: game-start from ${user.username}`);
    const message = {
      username: user.username,
      body: `님이 게임을 시작하셨습니다.`,
      timestamp: Date.now(),
      chatEvent: ChatEvent.Message,
    };
    this.logger.debug(`<-- ws: chat-message ${util.inspect(message)}`);
    this.server.to(roomCode).emit('chat-message', message);

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

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      const user = this.getUser(client);

      const joinedRoom = await this.userService.getJoinedRoom(user);
      const roomCode = joinedRoom.room.code;
      this.logger.log(
        `client ${user.username} leaving room ${roomCode} and disconnecting...`,
      );

      const message: Partial<MessageInterface> = {
        username: user.username,
        body: `님의 연결이 끊어졌습니다.`,
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
