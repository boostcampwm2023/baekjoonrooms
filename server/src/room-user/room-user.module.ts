import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoomUser from 'src/entities/room-user.entity';
import { RoomUserService } from './room-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomUser])],
  controllers: [],
  providers: [RoomUserService],
  exports: [RoomUserService, TypeOrmModule],
})
export class RoomUserModule {}
