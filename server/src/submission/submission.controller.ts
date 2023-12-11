import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RoomSubmissionDto } from './dto/roomSubmission.dto';
import { SubmissionDto } from './dto/submission.dto';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @ApiOperation({
    summary: '백준에서 코드가 제출됨',
    description:
      '백준에서 코드가 제출되었을 때 받는 요청을 처리하는 API로 채점이 완료될 때까지 작동합니다',
  })
  @Post()
  async submitCode(@Body() submissionDto: SubmissionDto) {
    return await this.submissionService.submitCode(submissionDto);
  }

  @ApiOperation({
    summary: 'roomCode에 해당하는 방에 속한 유저들의 최종 제출 정보',
  })
  @Get()
  async getRoomSumbmission(@Query() roomSubmissionDto: RoomSubmissionDto) {
    return await this.submissionService.getRoomSubmission(roomSubmissionDto);
  }
}
