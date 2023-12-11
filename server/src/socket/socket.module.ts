import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '../user/user.module';
import { SocketService } from './socket.service';
import { ProblemModule } from 'src/problem/problem.module';

@Module({
  providers: [SocketGateway, SocketService],
  imports: [UserModule, ProblemModule],
  exports: [SocketService],
})
export class SocketModule {}
