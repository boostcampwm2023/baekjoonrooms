import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Room from './room.entity';
import User from './user.entity';

@Entity()
export default class RoomUser extends BaseEntity {
  @PrimaryColumn()
  roomId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => Room, (room) => room.joinedUsers)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room;

  @ManyToOne(() => User, (user) => user.joinedRooms)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
