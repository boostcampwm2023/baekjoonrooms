import { useAuthContext } from '../contexts/AuthProvider';

export default function Profile() {
  const { user } = useAuthContext();
  const userInfo = { provider: user?.provider, providerId: user?.providerId };
  if (
    !localStorage.getItem('userInfo') ||
    localStorage.getItem('userInfo') !== JSON.stringify(userInfo)
  ) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  // TODO: AuthContext쪽 UserType 재정의
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <img
        className="w-12 rounded-full"
        src={user!.avatarUrl}
        alt="프로필 이미지"
      />
      <p className="text-lg font-semibold text-text_default">
        {user!.username}
      </p>
    </div>
  );
}
