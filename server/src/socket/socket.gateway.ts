import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    console.log('sending message using WsResponse', data);

    return { event: 'message', data: data };
  }

  // @SubscribeMessage('message')
  // handleEvent(@MessageBody() data: string): string {
  //   console.log('identity message:', data);
  //   console.log('sending back the response!');
  //   return 'naerisotnaersitonareistonareistnoarestionaresitnarsot';
  // }
}
