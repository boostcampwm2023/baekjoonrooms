import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RandomProblemDto } from './dto/random.problem.dto';
import { SearchProblemDto } from './dto/search.problem.dto';
import { ProblemService } from './problem.service';

@Controller('problem')
@ApiTags('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  @ApiOperation({
    summary: '문제 검색',
    description:
      '백준 문제 번호 또는 문제 이름이 검색 키워드로 시작하는 모든 문제들을 검색합니다',
  })
  async searchProblem(@Query() searchProblemDto: SearchProblemDto) {
    return this.problemService.searchProblem(searchProblemDto);
  }

  @Get('random')
  async randomProblem(@Query() randomProblemDto: RandomProblemDto) {
    return this.problemService.getRandomProblem(randomProblemDto);
  }
}
