import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '../user/user.module';
import { SocketService } from './socket.service';
import { ProblemModule } from 'src/problem/problem.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Room from '../entities/room.entity';

@Module({
  providers: [SocketGateway, SocketService],
  imports: [UserModule, ProblemModule, TypeOrmModule.forFeature([Room])],
  exports: [SocketService],
})
export class SocketModule {}
