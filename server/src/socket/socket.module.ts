import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '../user/user.module';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketGateway, SocketService],
  imports: [UserModule],
  exports: [SocketService],
})
export class SocketModule {}
