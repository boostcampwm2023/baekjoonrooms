import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import Room from './room.entity';

@Entity()
export default class Submission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ comment: '제출한 코드의 프로그래밍 언어' })
  language: string;

  @Column({ type: 'text', comment: '제출한 코드' })
  code: string;

  @CreateDateColumn({ type: 'timestamp' })
  submittedAt: Date;

  // 제출한 사람
  @ManyToOne(() => User, (user) => user.submissions, { cascade: true })
  user: User;

  @ManyToOne(() => Room, (room) => room.submissions, { cascade: true })
  room: Room;
}
