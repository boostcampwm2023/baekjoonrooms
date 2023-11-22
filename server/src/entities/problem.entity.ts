import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Submission from './submission.entity';

@Entity()
export default class Problem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bojProblemId: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ comment: 'solved.ac의 난이도, 정수로 표현됨' })
  level: number;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[];
}
