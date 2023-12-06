import { Body, Controller, Post } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionDto } from './dto/submission.dto';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  async submitCode(@Body() submissionDto: SubmissionDto) {
    return await this.submissionService.submitCode(submissionDto);
  }
}
