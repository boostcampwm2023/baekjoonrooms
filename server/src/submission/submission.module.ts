import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Submission from 'src/entities/submission.entity';
import { ProblemModule } from 'src/problem/problem.module';
import { UserModule } from 'src/user/user.module';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';

@Module({
  imports: [UserModule, ProblemModule, TypeOrmModule.forFeature([Submission])],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
