import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Room from '../entities/room.entity';
import { RoomUserModule } from '../room-user/room-user.module';
import { UserModule } from '../user/user.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    UserModule,
    RoomUserModule,
    TypeOrmModule.forFeature([Room]),
    SocketModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService, TypeOrmModule],
})
export class RoomModule {}
