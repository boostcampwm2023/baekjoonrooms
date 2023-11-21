import { useAuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Lobby() {
  const { user, onLogout } = useAuthContext();

  return (
    <>
      <h1 className="bg-red-50 text-2xl font-bold">Lobby</h1>
      <h2>{user?.username}</h2>
      <button
        className="border-2 border-black p-2"
        onClick={() => {
          onLogout();
        }}>
        Logout
      </button>
      <Link to="/room/1">Room</Link>
    </>
  );
}
