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
import * as util from 'util';
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
    const joinedRoom = await this.userService.getJoinedRoom(user);

    const roomCode = joinedRoom.room.code;
    this.logger.debug(`client ${user.username} joining room ${roomCode}`);

    client.join(roomCode);
    this.logger.debug(`client ${client.id} connected`);
  }

  @SubscribeMessage('chat-message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Partial<MessageInterface>,
  ) {
    this.logger.debug(`client ${client.id} sent ${util.inspect(message.body)}`);

    this.logger.debug(
      `<--- server sent ${util.inspect(message.body)} to room RM1234`,
    );
    if (this.server == null) {
      this.logger.error('server is null!');
      return;
    }
    this.server.to('RM1234').emit('chat-message', message);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.debug(`client ${client.id} disconnected`);
  }

  @SubscribeMessage('piesocket-test')
  piesocketTest(@MessageBody() body) {
    this.logger.debug(`piesocket sent ${util.inspect(body)}`);

    if (this.server == null) {
      this.logger.error('server is null!');
      return;
    }
    this.server
      .to('RM1234')
      .emit('piesocket-test', `${util.inspect(body)} from server!`);
  }
}
