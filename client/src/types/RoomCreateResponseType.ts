
export interface RoomCreateResponseType {
    code: string;
    host: {
      id: number;
      username: string;
      provider: string;
      providerId: string;
      avatarUrl: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      joinedRoom: string;
    };
    users: {
      id: number;
      username: string;
      provider: string;
      providerId: string;
      avatarUrl: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      joinedRoom: string;
    }[];
    endAt: string;
    updatedAt: string;
    deletedAt: string;
    id: number;
    createdAt: string;
  }
  