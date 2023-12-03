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

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`client ${client.id} connected`);
    client.join('RM1234');
  }

  @SubscribeMessage('chat-message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: MessageInterface,
  ) {
    console.log(`handleMessage [start]: ${client.id} sent ${message.body}`);

    const roomCode = 'RM1234';

    this.server.to(roomCode).emit('chat-message', message);
    console.log(`handleMessage [end]`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`client ${client.id} disconnected`);
  }
}
