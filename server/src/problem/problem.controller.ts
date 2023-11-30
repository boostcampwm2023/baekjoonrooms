import { Controller, Get, Query } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { SearchProblemDto } from './dto/search.problem.dto';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  async searchProblem(@Query() searchProblemDto: SearchProblemDto) {
    return this.problemService.searchProblem(searchProblemDto);
  }
}
