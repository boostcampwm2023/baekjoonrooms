import { useAuthUpdateContext } from '../contexts/AuthContext';

export default function Home() {
  const { onLogin } = useAuthUpdateContext();
  return (
    <div className="bg-aod_bg flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-aod_text my-2 text-3xl font-bold">BOJ Rooms</h1>
      <button className="text-aod_text my-2 flex items-center rounded-lg bg-gray-800 px-5 py-2.5 text-sm hover:bg-gray-600">
        <img
          src="/assets/Github.png"
          alt="GitHub logo"
          className="mr-2 h-5 w-5"
        />
        Login with GitHub
      </button>
      <button
        className="my-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
        onClick={() => {
          onLogin();
        }}>
        Test Login
      </button>
    </div>
  );
}
