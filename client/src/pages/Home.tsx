import { useNavigate } from 'react-router-dom';
import { useAuthContext, useAuthUpdateContext } from '../contexts/AuthContext';
import GithubLoginButton from '../components/buttons/GithubLoginButton';
import { useEffect } from 'react';

import { UserType } from '../types/UserType';

export default function Home() {
  const { user } = useAuthContext();
  const { tmpLogin } = useAuthUpdateContext();
  const navigate = useNavigate();

  const tempLogin = () => {
    const tmpUser: UserType = {
      provider: 'github',
      providerId: '123456789',
      username: 'temp',
      avatarUrl: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    };

    tmpLogin(tmpUser);
  };

  useEffect(() => {
    if (user) {
      navigate('/lobby');
    }
  }, [navigate, user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-aod_bg">
      <h1 className="my-2 text-3xl font-bold text-aod_text">Baekjoon Rooms</h1>
      <GithubLoginButton />
      <button className="text-3xl font-bold text-aod_text" onClick={tempLogin}>
        TEMP LOGIN
      </button>
    </div>
  );
}
