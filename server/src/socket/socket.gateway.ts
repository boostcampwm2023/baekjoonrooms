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
import { Logger, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SessionAuthGuard } from '../auth/auth.guard';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server?: Server;

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly userService: UserService) {}

  @UseGuards(SessionAuthGuard)
  handleConnection(@ConnectedSocket() client: Socket) {
    const request = client.request as any;
    this.logger.debug(`${util.inspect(request.user)}`);

    this.logger.debug(`client ${client.id} connected`);

    client.join('RM1234');
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
