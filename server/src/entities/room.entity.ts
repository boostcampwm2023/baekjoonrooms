import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';
import Submission from './submission.entity';
import Problem from './problem.entity';

@Entity()
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ type: 'timestamp', comment: '방 내 대회 만료 시간' })
  endAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  host: User;

  @OneToMany(() => User, (user) => user.activeRoom)
  activeUsers: User[];

  @OneToMany(() => User, (user) => user.inactiveRoom)
  inactiveUsers: User[];

  @OneToMany(() => Submission, (submission) => submission.room)
  submissions: Submission[];

  // 이 방에서 출제된 문제들
  @ManyToMany(() => Problem, (problem) => problem.rooms)
  @JoinTable()
  problems: Problem[];
}
