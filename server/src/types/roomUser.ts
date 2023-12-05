import Room from 'src/entities/room.entity';
import User from 'src/entities/user.entity';

export interface CreateRoomUserInput {
  room: Room;
  user: User;
}
