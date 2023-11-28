import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Room from './room.entity';
import Submission from './submission.entity';

@Entity()
@Index(['provider', 'providerId'], { unique: true })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column({ comment: 'OAuth provider string id' })
  username: string;

  @Column({ comment: 'OAuth provider' })
  provider: string;

  @Column({ comment: 'OAuth provider id' })
  providerId: string;

  @Column({ comment: 'github 프로필 이미지 url', nullable: true })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Room, (room) => room.users, {
    cascade: true,
    nullable: true,
  })
  joinedRoom: Room;

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];
}
