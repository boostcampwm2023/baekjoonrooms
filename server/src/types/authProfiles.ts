export interface AuthProfile {
  providerId: string;
  provider: string;
}

export interface GitHubProfile extends AuthProfile {
  id: string;
  profileUrl: string;
  login: string;
  username: string;
  _json?: {
    avatar_url?: string;
  };
}
