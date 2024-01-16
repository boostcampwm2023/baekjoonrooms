import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Problem from '../entities/problem.entity';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService],
})
export class ProblemModule {}
