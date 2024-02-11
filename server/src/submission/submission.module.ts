import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Submission from '../entities/submission.entity';
import { ProblemModule } from '../problem/problem.module';
import { RoomUserModule } from '../room-user/room-user.module';
import { UserModule } from '../user/user.module';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { SocketModule } from '../socket/socket.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    UserModule,
    ProblemModule,
    forwardRef(() => RoomModule),
    RoomUserModule,
    TypeOrmModule.forFeature([Submission]),
    SocketModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
  exports: [SubmissionService],
})
export class SubmissionModule {}
