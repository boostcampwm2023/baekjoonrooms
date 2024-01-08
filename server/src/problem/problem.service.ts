import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Problem from '../entities/problem.entity';
import { ILike, In, Raw, Repository } from 'typeorm';
import { RandomProblemDto } from './dto/random.problem.dto';
import { SearchProblemDto } from './dto/search.problem.dto';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  async searchProblem(searchProblemDto: SearchProblemDto) {
    const { searchKeyword } = searchProblemDto;

    // Raw를 사용하면 보안 상의 위험이 있을 수 있다고 하나
    // 우선적으로 searchKeyword가 숫자로만 이루어져있는지 확인하기 때문에 괜찮을 것이라고 추측
    return await this.problemRepository.find({
      where: [
        {
          bojProblemId: Number(searchKeyword)
            ? Raw((alias) => `${alias} LIKE '${searchKeyword}%'`)
            : 0,
        },
        { title: ILike(`${searchKeyword}%`) },
      ],
    });
  }

  async getRandomProblem(randomProblemDto: RandomProblemDto) {
    const { tagIds, levels, count } = randomProblemDto;

    // TODO: tagIds, levels가 비어있을 경우 처리
    const problems = await this.problemRepository.find({
      where: {
        level: In(levels),
        tags: {
          id: In(tagIds),
        },
      },
      relations: { tags: true },
    });

    const shuffledProblems = problems.sort(() => 0.5 - Math.random());
    return shuffledProblems.slice(0, count);
  }

  async getProblemByBojProblemId(bojProblemId: number) {
    return await this.problemRepository.findOne({
      where: { bojProblemId },
    });
  }

  async getProblemsByBojProblemIds(bojProblemIds: number[]) {
    const problemEntities: Problem[] = [];
    for (const bojProblemId of bojProblemIds) {
      const problem = await this.getProblemByBojProblemId(bojProblemId);
      if (problem == null) {
        throw new Error(`bojProblemId ${bojProblemId} not found`);
      }
      problemEntities.push(problem);
    }
    return problemEntities;
  }
}
