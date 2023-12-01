import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Problem from './problem.entity';
import Submission from './submission.entity';
import User from './user.entity';

@Entity()
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '방 내 대회 만료 시간',
  })
  endAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.hostedRooms, {
    cascade: true,
    nullable: true,
  })
  host: User;

  // 이 방에 참가한 사람들
  @OneToMany(() => User, (user) => user.joinedRoom)
  users: User[];

  @OneToMany(() => Submission, (submission) => submission.room)
  submissions: Submission[];

  // 이 방에서 출제된 문제들
  @ManyToMany(() => Problem, (problem) => problem.rooms)
  @JoinTable()
  problems: Problem[];
}
