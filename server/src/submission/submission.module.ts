import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Submission from 'src/entities/submission.entity';
import { ProblemModule } from 'src/problem/problem.module';
import { RoomUserModule } from 'src/roomUser/room.user.module';
import { UserModule } from 'src/user/user.module';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    UserModule,
    ProblemModule,
    RoomUserModule,
    TypeOrmModule.forFeature([Submission]),
    SocketModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
