import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'github id' })
  username: string;

  @Column({ comment: 'github 프로필 이미지 url' })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => Room, (room) => room.host, { cascade: true })
  room: Room;

  @ManyToOne(() => Room, (room) => room.activeUsers, { cascade: true })
  activeRoom: Room;

  @ManyToOne(() => Room, (room) => room.inactiveUsers, { cascade: true })
  inactiveRoom: Room;
}
