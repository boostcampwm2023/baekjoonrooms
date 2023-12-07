import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as cheerio from 'cheerio';
import { BojResultsToStatus, Status } from 'src/const/bojResults';
import Submission from 'src/entities/submission.entity';
import { ProblemService } from 'src/problem/problem.service';
import { RoomUserService } from 'src/roomUser/room.user.service';
import { BojSubmissionInfo } from 'src/types/submission';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SubmissionDto } from './dto/submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,

    private readonly userService: UserService,
    private readonly problemService: ProblemService,
    private readonly roomUserService: RoomUserService,
  ) {}

  async submitCode(submissionDto: SubmissionDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [bojUserId, bojProblemStringId, _] = submissionDto.submitURL
      .split('?')[1]
      .split('&')
      .map((v) => v.split('=')[1]);
    const submittedAt = new Date(); // extension으로 sumbit time을 받아서 판단하는 것이 더 정확한데 현재는 그냥 request가 들어오는 시간을 submittedAt으로 사용함
    const bojProblemId = Number(bojProblemStringId);
    const { provider, providerId } = submissionDto;

    const user = await this.userService.findUserByProviderInfoWithRooms({
      provider,
      providerId,
    });
    if (!user) throw new BadRequestException('존재하지 않는 유저입니다.');

    const roomUser =
      await this.roomUserService.findRoomUserByUserWithRoom(user);
    if (!roomUser) throw new BadRequestException('참여중인 방이 없습니다.');
    const room = roomUser.room;

    const problem =
      await this.problemService.getProblemByBojProblemId(bojProblemId);
    if (!problem) throw new BadRequestException('존재하지 않는 문제입니다.');

    // TODO : 이 즈음에서 socket emit 해서 클라이언트에서 제출한 문제가 제출되었다는 것을 알려줘야 함

    const status = await this.getBojSubmissionStatus({
      bojUserId,
      bojProblemStringId,
      submittedAt,
    });

    // TODO : 이 즈음에서 socket emit 해서 클라이언트에서 제출한 문제가 채점된 것을 알려줘야 함

    return await this.submissionRepository
      .create({
        status,
        user,
        room,
        problem,
        submittedAt,
      })
      .save();
  }

  // TODO : extension으로 sumbit time을 받지 않기에 현재는 제일 처음에 fetch 했을 때, 가장 위에 있는 row를 제출했던 것으로 간주함
  async getBojSubmissionStatus(bojSubmissionInfo: BojSubmissionInfo) {
    let status = Status.WAITING;
    let bojSolutionId: string = '';
    const { bojUserId, bojProblemStringId } = bojSubmissionInfo;
    const bojStatusUrl = `https://www.acmicpc.net//status?user_id=${bojUserId}&problem_id=${bojProblemStringId}`;

    while (status === Status.WAITING) {
      const statusPage = await fetch(bojStatusUrl).then((res) => res.text());
      const $ = cheerio.load(statusPage);
      const allSubmissions = $('tbody > tr');

      allSubmissions.each((index, element) => {
        const { tmpBojSolutionId, tmpStatus } = this.getEachSubmissionInfo(
          $,
          element,
        );

        if (bojSolutionId === '') {
          bojSolutionId = tmpBojSolutionId;
          status = BojResultsToStatus[tmpStatus];
          return false;
        }

        if (tmpBojSolutionId === bojSolutionId) {
          status = BojResultsToStatus[tmpStatus];
          return false;
        }
      });

      if (status === Status.WAITING) await this.sleep(500);
    }

    return status;
  }

  getEachSubmissionInfo(
    $: cheerio.CheerioAPI,
    submissionElement: cheerio.Element,
  ) {
    const tdElements = $(submissionElement).find('td');
    const tmpBojSolutionId = $(tdElements[0]).text();
    const tmpStatus = $(tdElements[3])
      .find('span')
      .attr('data-color') as string;

    return { tmpBojSolutionId, tmpStatus };
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
