import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import GithubLoginButton from '../components/buttons/GithubLoginButton';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  async function mockLogin({ id }: { id: string }) {
    const mockUser = {
      username: `mock${id}`,
      password: `mock${id}`,
    };
    const response = await axios.post(`${baseURL}/auth/mock`, mockUser, {
      withCredentials: true,
    });
    if (response) {
      console.log(response.data);
      navigate('/lobby');
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/lobby');
    }
  }, [navigate, user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-aod_bg">
      <h1 className="my-2 text-3xl font-bold text-aod_text">Baekjoon Rooms</h1>
      <GithubLoginButton />
      <div className="flex flex-col gap-2">
        <button
          id="1"
          className="border bg-aod_text p-2"
          onClick={() => {
            mockLogin({ id: '1' });
          }}>
          Mock 1
        </button>
        <button
          id="2"
          className="border bg-aod_text p-2"
          onClick={() => {
            mockLogin({ id: '2' });
          }}>
          Mock 2
        </button>
        <button
          id="3"
          className="border bg-aod_text p-2"
          onClick={() => {
            mockLogin({ id: '3' });
          }}>
          Mock 3
        </button>
        <button
          id="4"
          className="border bg-aod_text p-2"
          onClick={() => {
            mockLogin({ id: '4' });
          }}>
          Mock 4
        </button>
      </div>
    </div>
  );
}
