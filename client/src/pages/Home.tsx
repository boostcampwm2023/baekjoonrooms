import GithubLoginButton from '../components/buttons/GithubLoginButton';
import MockLogin from '../components/temp/MockLogin';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg">
      <h1 className="my-2 text-3xl font-bold text-text_default">
        Baekjoon Rooms
      </h1>
      <GithubLoginButton />
      {import.meta.env.VITE_BASE_URL === 'http://localhost:4000' && (
        <MockLogin />
      )}
    </div>
  );
}
