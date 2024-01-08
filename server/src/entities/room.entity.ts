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
import RoomUser from '../room-user/room-user.entity';
import Submission from './submission.entity';
import User from './user.entity';

@Entity()
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '방 내 대회 만료 시간',
  })
  endAt?: Date;

  @Column({
    type: 'boolean',
  })
  isStarted!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.hostedRooms, {
    lazy: true,
    nullable: false,
  })
  host?: Promise<User>;

  @OneToMany(() => RoomUser, (roomUser) => roomUser.room, { lazy: true })
  joinedUsers?: Promise<RoomUser[]>;

  @OneToMany(() => Submission, (submission) => submission.room, { lazy: true })
  submissions?: Promise<Submission[]>;

  // 이 방에서 출제된 문제들
  @ManyToMany(() => Problem, (problem) => problem.rooms, { lazy: true })
  @JoinTable()
  problems?: Promise<Problem[]>;
}
