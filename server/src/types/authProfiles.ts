export interface AuthProfile {
  providerId: string;
  provider: string;
}

export interface GitHubProfile extends AuthProfile {
  login: string;
  username: string;
  _json?: {
    avatar_url?: string;
  };
}
