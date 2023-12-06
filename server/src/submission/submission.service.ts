import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Submission from 'src/entities/submission.entity';
import { ProblemService } from 'src/problem/problem.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SubmissionDto } from './dto/submission.dto';
import { BojSubmissionInfo } from 'src/types/submission';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,

    private readonly userService: UserService,
    private readonly problemService: ProblemService,
  ) {}

  async submitCode(submissionDto: SubmissionDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [bojUserId, bojProblemStringId, _] = submissionDto.submitURL
      .split('?')[1]
      .split('&')
      .map((v) => v.split('=')[1]);

    const bojSubmissionInfo: BojSubmissionInfo = {
      bojUserId,
      bojProblemStringId,
      submittedAt: new Date(),
    };
    const bojProblemId = Number(bojProblemStringId);
    const { provider, providerId } = submissionDto;

    const user = await this.userService.findUserByProviderInfoWithRooms({
      provider,
      providerId,
    });
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    if (!user.joinedRooms || user.joinedRooms.length === 0)
      throw new BadRequestException('참여중인 방이 없습니다.');
    const room = user.joinedRooms[0];

    const problem =
      await this.problemService.getProblemByBojProblemId(bojProblemId);
    if (!problem) throw new BadRequestException('존재하지 않는 문제입니다.');

    const status = await this.getBojSubmissionStatus(bojSubmissionInfo);

    return await this.submissionRepository.create({
      status,
      user,
      room,
      problem,
      submittedAt: bojSubmissionInfo.submittedAt,
    });
  }

  async getBojSubmissionStatus(bojSubmissionInfo: BojSubmissionInfo) {}
}
