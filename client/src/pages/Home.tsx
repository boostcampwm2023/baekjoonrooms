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
    <div className="flex min-h-screen flex-col items-center justify-center bg-aod_bg">
      <h1 className="my-2 text-3xl font-bold text-aod_text">Baekjoon Rooms</h1>
      <GithubLoginButton />
      {import.meta.env.VITE_BASE_URL === 'http://localhost:4000' && (
        <MockLogin />
      )}
    </div>
  );
}
