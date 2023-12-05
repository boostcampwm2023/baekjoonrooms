import Room from 'src/entities/room.entity';
import User from 'src/entities/user.entity';

export interface RoomUserInput {
  room: Room;
  user: User;
}
