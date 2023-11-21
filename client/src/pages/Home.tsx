import { useAuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { onLogin } = useAuthContext();
  return (
    <>
      <h1 className="bg-red-50 text-2xl font-bold">BOJ Rooms</h1>
      <button
        className="border-2 border-black p-2"
        onClick={() => {
          onLogin();
        }}>
        Login
      </button>
    </>
  );
}
