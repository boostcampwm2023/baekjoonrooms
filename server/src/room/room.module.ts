import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Room from 'src/entities/room.entity';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
