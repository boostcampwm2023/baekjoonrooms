import { Module } from '@nestjs/common';
import { ClassifiedService } from './classified.service';
import { ClassifiedController } from './classified.controller';

@Module({
  controllers: [ClassifiedController],
  providers: [ClassifiedService],
})
export class ClassifiedModule {}
