export interface UserSession {
  provider: string;
  providerId: string;
  username: string;
  avatarUrl: string;
  participatingRoomCode?: string;
  isHost?: boolean;
}

export function isUserSession(user: any): user is UserSession {
  return (
    user.provider !== undefined &&
    user.providerId !== undefined &&
    user.username !== undefined &&
    user.avatarUrl !== undefined
  );
}
