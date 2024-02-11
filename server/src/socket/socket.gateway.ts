import { Logger, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { isNil } from 'src/common/utils';
import { Repository } from 'typeorm';
import Room from '../entities/room.entity';
import User from '../entities/user.entity';
import { ProblemService } from '../problem/problem.service';
import { ChatEvent, MessageInterface } from '../types/message-interface';
import { RoomInfoType } from '../types/room-info';
import { UserService } from '../user/user.service';
import { WebsocketExceptionsFilter } from './socket.filter';
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
    private readonly problemService: ProblemService,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  afterInit(server: Server) {
    this.logger.log('socket gateway initialized');
    this.socketService.setServer(server);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const user = this.getUser(client);
      const roomUser = await this.userService.getSingleJoinedRoom(user);
      const room = roomUser.room;

      this.logger.log(`client ${user.username} joining room ${room.code}`);
      client.join(room.code);
      this.server
        .to(room.code)
        .emit('room-info', await this.socketService.makeRoomInfo(room));

      const message: MessageInterface = {
        username: user.username,
        body: `님께서 연결되었습니다.`,
        timestamp: Date.now(),
        chatEvent: ChatEvent.Join,
      };
      this.server.to(room.code).emit('chat-message', message);
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
    const { provider, providerId } = this.getUser(client);
    // important: unlike HTTP requests, socket requests do not update the request.user field.
    // so we have to reload the user from the database.
    const user = await this.userService.findUserByProviderInfo({
      provider,
      providerId,
    });
    if (isNil(user)) throw new WsException('user is null');

    await this.socketService.gameStart(user, roomInfo);
  }

  @SubscribeMessage('chat-message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: MessageInterface,
  ) {
    const user = this.getUser(client);
    const roomUser = await this.userService.getSingleJoinedRoom(user);
    const room = roomUser.room;
    this.logger.debug(
      `--> ws: ${user.username} in room ${room.code} sent message:`,
      message,
    );

    if (isNil(this.server)) throw new WsException('server is null');

    this.logger.debug(`--> ws: chat-message ${message.body}`);
    this.server.to(room.code).emit('chat-message', message);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      const user = this.getUser(client);

      const roomUser = await this.userService.getSingleJoinedRoom(user);
      const room = roomUser.room;
      this.logger.log(
        `client ${user.username} leaving room ${room.code} and disconnecting...`,
      );

      const message: MessageInterface = {
        username: user.username,
        body: `님의 연결이 끊어졌습니다.`,
        timestamp: Date.now(),
        chatEvent: ChatEvent.Leave,
      };
      this.server.to(room.code).emit('chat-message', message);
    } catch (e) {
      if (e instanceof WsException) {
        this.logger.error('--> ws: error while disconnecting...');
        this.logger.error(e);
        this.logger.error('<-- ws: error caught...');
      }
    }
  }

  getUser(client: Socket): User {
    const request = client.request as any;
    if (isNil(request)) throw new WsException('request is null');
    const user = request.user;
    if (isNil(user)) throw new WsException('user is null');
    return user as User;
  }
}
