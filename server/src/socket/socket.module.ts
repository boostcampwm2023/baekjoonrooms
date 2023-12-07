import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SocketGateway],
  imports: [UserModule],
})
export class SocketModule {}
