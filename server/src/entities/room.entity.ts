import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';
import Submission from './submission.entity';

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
}
