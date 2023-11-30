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
import { ChatEvent, MessageInterface } from '../types/MessageInterface';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.log(`client ${client.id} connected`);
    client.join('RM1234');

    const chatResponse: MessageInterface = {
      timestamp: Date.now(),
      username: 'Baekjoonrooms',
      body: 'Welcome to Baekjoonrooms!',
      chatEvent: ChatEvent.Message,
      color: 'text-red-400',
    };

    client.emit('chat-message', chatResponse);
    console.log(`client ${client.id} joined RM1234 end`);
  }

  // @SubscribeMessage('join-room')
  // handleJoinRoom(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() data: { roomCode: string },
  // ) {
  //   const { roomCode } = data;
  //
  //   console.log(
  //     `handleJoinRoom [start]: ${client.id} joining the room ${roomCode}`,
  //   );
  //
  //   const chatResponse: MessageInterface = {
  //   };
  //   client.join(roomCode);
  //   this.server.to(roomCode).emit('chat-message', chatResponse);
  //   console.log(
  //     `handleJoinRoom [end]: ${client.id} joining the room ${roomCode}`,
  //   );
  // }
  //
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
