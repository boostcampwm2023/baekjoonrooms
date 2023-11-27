import { useAuthUpdateContext } from '../contexts/AuthContext';
import { FaGithub } from 'react-icons/fa6';

export default function Home() {
  const { onLogin } = useAuthUpdateContext();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-aod_bg">
      <h1 className="my-2 text-3xl font-bold text-aod_text">Baekjoon Rooms</h1>
      <button className="hover:bg-gray-600 my-2 flex items-center gap-2 rounded-lg bg-aod_black px-4 py-2.5 text-sm text-aod_text">
        <FaGithub size="1rem" />
        Login with GitHub
      </button>
      <button
        className="bg-blue-500 text-white hover:bg-blue-700 my-2 rounded-lg px-5 py-2.5 text-sm font-bold"
        onClick={() => {
          onLogin();
        }}>
        Test Login
      </button>
    </div>
  );
}
