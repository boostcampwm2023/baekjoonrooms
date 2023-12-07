export interface UserSession {
  provider: string;
  providerId: string;
  username: string;
  avatarUrl: string;
  participatingRoomCode?: string;
}
