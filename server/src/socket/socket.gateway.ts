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
import { MessageInterface } from '../types/MessageInterface';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';
import { SessionAuthGuard } from 'src/auth/auth.guard';
import { WebsocketExceptionsFilter } from './socket.filter';

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
  private readonly server?: Server;

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly userService: UserService) {}
  @UseGuards(SessionAuthGuard)
  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const request = client.request as any;
      const user = request.user as User;
      const joinedRoom = await this.userService.getJoinedRoom(user);

      const roomCode = joinedRoom.room.code;
      this.logger.debug(`client ${user.username} joining room ${roomCode}`);

      client.join(roomCode);
      this.logger.debug(`client ${client.id} connected`);
    } catch (e) {
      this.logger.error('error while connecting and joining room...');
      this.logger.error(e);
    }
  }

  @SubscribeMessage('chat-message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Partial<MessageInterface>,
  ) {
    const request = client.request as any;
    const user = request.user as User;
    const joinedRoom = await this.userService.getJoinedRoom(user);
    const roomCode = joinedRoom.room.code;

    if (this.server == null) throw new WsException('server is null');

    this.server.to(roomCode).emit('chat-message', message);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.debug(`client ${client.id} disconnected`);
  }
}
