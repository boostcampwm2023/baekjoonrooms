import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
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
}
