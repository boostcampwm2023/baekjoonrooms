import { Controller, Get, Query } from '@nestjs/common';
import { SearchProblemDto } from './dto/search.problem.dto';
import { ProblemService } from './problem.service';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  async searchProblem(@Query() searchProblemDto: SearchProblemDto) {
    return this.problemService.searchProblem(searchProblemDto);
  }
}
