import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Room from './room.entity';
import RoomUser from './roomUser.entity';
import Submission from './submission.entity';

@Entity()
@Index(['provider', 'providerId'], { unique: true })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: 'OAuth provider string id' })
  username?: string;

  @Column({ comment: 'OAuth provider' })
  provider!: string;

  @Column({ comment: 'OAuth provider id' })
  providerId!: string;

  @Column({ comment: 'github 프로필 이미지 url', nullable: true })
  avatarUrl?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => RoomUser, (roomUser) => roomUser.user, {
    lazy: true,
  })
  joinedRooms?: Promise<RoomUser[]>;

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions?: Submission[];

  @OneToMany(() => Room, (room) => room.host)
  hostedRooms?: Room[];
}
