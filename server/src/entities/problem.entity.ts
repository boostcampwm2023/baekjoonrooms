import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Submission from './submission.entity';
import Tag from './tag.entity';
import Room from './room.entity';

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

  // 이 문제에 붙은 태그들
  @ManyToMany(() => Tag, (tag) => tag.problems)
  @JoinTable()
  tags: Tag[];

  // 이 문제가 출제된 방들
  @ManyToMany(() => Room, (room) => room.problems)
  rooms: Room[];
}
