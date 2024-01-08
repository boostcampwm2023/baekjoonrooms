import Room from '../entities/room.entity';
import User from '../entities/user.entity';

export interface RoomUserInput {
  room: Room;
  user: User;
}
