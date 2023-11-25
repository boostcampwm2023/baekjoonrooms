import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Room from './room.entity';
import Submission from './submission.entity';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'github id' })
  username: string;

  @Column({ comment: 'github 프로필 이미지 url', nullable: true })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Room, (room) => room.users, { cascade: true, nullable: true })
  joinedRoom: Room;

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];
}
