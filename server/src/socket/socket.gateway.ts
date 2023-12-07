import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageInterface } from '../types/MessageInterface';
import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import User from '../entities/user.entity';

// @UseFilters(new WebsocketExceptionsFilter())
@WebSocketGateway({
  cors: {
    origin: ['http://localhost5173', '*'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server?: Server;

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly userService: UserService) {}
  // @UseGuards(SessionAuthGuard)
  async handleConnection(@ConnectedSocket() client: Socket) {
    const request = client.request as any;
    const user = request.user as User;
    if (user == null) {
      this.logger.error('user is null!');
      return;
    }
    try {
      const joinedRoom = await this.userService.getJoinedRoom(user);

      const roomCode = joinedRoom.room.code;
      this.logger.debug(`client ${user.username} joining room ${roomCode}`);

      client.join(roomCode);
      this.logger.debug(`client ${client.id} connected`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @SubscribeMessage('chat-message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Partial<MessageInterface>,
  ) {
    try {
      const request = client.request as any;
      const user = request.user as User;
      const joinedRoom = await this.userService.getJoinedRoom(user);
      const roomCode = joinedRoom.room.code;

      if (this.server == null) {
        this.logger.error('server is null!');
        return;
      }

      this.server.to(roomCode).emit('chat-message', message);
    } catch (e) {
      this.logger.error(e);
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.debug(`client ${client.id} disconnected`);
  }
}
