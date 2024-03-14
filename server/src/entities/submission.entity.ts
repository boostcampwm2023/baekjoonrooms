import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../const/boj-results';
import Problem from './problem.entity';
import Room from './room.entity';
import User from './user.entity';

@Entity()
export default class Submission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  status?: Status;

  // TODO?: enum으로 바꾸기
  @Column({ comment: '제출한 코드의 프로그래밍 언어', nullable: true })
  language?: string;

  @Column({ type: 'text', comment: '제출한 코드', nullable: true })
  code?: string;

  @Column({ comment: '요청이 들어온 시간 기준으로 판단', type: 'timestamp' })
  submittedAt?: Date;

  // 제출한 사람(submitter)
  @ManyToOne(() => User, (user) => user.submissions, { cascade: true })
  user?: User;

  @ManyToOne(() => Room, (room) => room.submissions, { cascade: false })
  room?: Room;

  @ManyToOne(() => Problem, (problem) => problem.submissions, { cascade: true })
  problem?: Problem;

  @Column()
  alreadyAccepted!: boolean;
}
