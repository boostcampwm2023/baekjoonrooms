import { useAuthUpdateContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Lobby() {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const { onLogout } = useAuthUpdateContext();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400/50 to-blue-500/50">
      <div className="flex w-full justify-end">
        <button
          className="m-4 rounded-lg bg-gray-800 p-2.5 px-5 text-sm text-white hover:bg-gray-600"
          onClick={onLogout}>
          Log out
        </button>
      </div>
      <div className="mt-32 flex flex-col items-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <img
            className="w-12 rounded-full"
            src={user.avatar_url}
            alt="프로필 이미지"
          />
          <p className="text-lg font-semibold">{user.username}</p>
        </div>
        <div className="flex w-[322px] flex-col items-center justify-center gap-4 rounded-xl border-8 border-gray-200 px-6 py-10">
          <Link to="/room/1">
            <button className="flex h-[33px] w-[150px] items-center justify-center rounded-lg bg-green-500 font-medium text-white hover:bg-green-400">
              Create room
            </button>
          </Link>
          <p className="">- or -</p>
          <form className="flex items-center justify-between gap-2">
            <input
              className="rounded-lg bg-gray-200 px-2 py-1"
              placeholder="Room code"
            />
            <button className="h-[33px] w-[60px] items-center justify-center rounded-lg bg-green-500 font-medium text-white hover:bg-green-400">
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
