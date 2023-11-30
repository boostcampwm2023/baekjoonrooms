import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Problem from 'src/entities/problem.entity';
import { ILike, Raw, Repository } from 'typeorm';
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
}
