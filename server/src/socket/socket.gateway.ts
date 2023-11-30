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

interface ChatResponse {
  speaker: string;
  message: string;
}

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log(`client ${client.id} connected`);
    client.join('RM1234');
    client.emit('chat-message', 'hello from server');
    console.log(`client ${client.id} joined RM1234 end`);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomCode: string },
  ) {
    const { roomCode } = data;

    console.log(
      `handleJoinRoom [start]: ${client.id} joining the room ${roomCode}`,
    );

    const chatResponse: ChatResponse = {
      speaker: 'server',
      message: `Client ${client.id} joined the room ${roomCode}`,
    };
    client.join(roomCode);
    this.server.to(roomCode).emit('chat-message', chatResponse);
    console.log(
      `handleJoinRoom [end]: ${client.id} joining the room ${roomCode}`,
    );
  }

  @SubscribeMessage('chat-message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ) {
    console.log(`handleMessage [start]: ${client.id} sent ${message}`);
    const roomCode = 'RM1234';
    const chatResponse: ChatResponse = {
      speaker: client.id,
      message: message,
    };
    this.server.to(roomCode).emit('chat-message', chatResponse);
    console.log(`handleMessage [end]: ${client.id} sent ${message}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`client ${client.id} disconnected`);
  }
}
