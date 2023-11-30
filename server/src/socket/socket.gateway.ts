import {
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

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`client ${client.id} connected`);
    client.emit('message', 'hello from server');
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, @MessageBody() data: { roomCode: string }) {
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
  handleMessage(client: Socket, @MessageBody() message: string) {
    console.log(`handleMessage [start]: ${client.id} sent ${message}`);
    const roomCode = 'rm1234';
    const chatResponse: ChatResponse = {
      speaker: client.id,
      message: message,
    };
    this.server.to(roomCode).emit('chat-message', chatResponse);
    console.log(`handleMessage [end]: ${client.id} sent ${message}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client ${client.id} disconnected`);
  }
}
