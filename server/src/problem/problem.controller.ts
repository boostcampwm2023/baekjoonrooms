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
  @ApiOperation({
    summary: '랜덤 문제 검색',
    description:
      '랜덤으로 문제를 검색합니다. 검색 조건은 태그와 난이도, 문제 개수입니다. 태그와 난이도는 쉼표(,)로 구분하며, 최대 count만큼의 문제를 반환합니다',
  })
  async randomProblem(@Query() randomProblemDto: RandomProblemDto) {
    return this.problemService.getRandomProblem(randomProblemDto);
  }
}
