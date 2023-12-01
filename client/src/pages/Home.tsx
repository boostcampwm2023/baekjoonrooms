import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import GithubLoginButton from '../components/buttons/GithubLoginButton';
import { useEffect } from 'react';
import MockLogin from '../components/temp/MockLogin';

export default function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/lobby');
    }
  }, [navigate, user]);

  return (
    <div className="bg-bg flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-text_default my-2 text-3xl font-bold">
        Baekjoon Rooms
      </h1>
      <GithubLoginButton />
      {import.meta.env.VITE_BASE_URL === 'http://localhost:4000' && (
        <MockLogin />
      )}
    </div>
  );
}
