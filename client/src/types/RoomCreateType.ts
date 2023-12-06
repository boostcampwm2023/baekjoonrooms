import { User } from './UserType';

export interface RoomCreateType {
  code: string;
  host: User;
  users: User[];
  endAt: string;
  updatedAt: string;
  deletedAt: string;
  id: number;
  createdAt: string;
}
