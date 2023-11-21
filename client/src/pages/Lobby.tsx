import { useAuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Lobby() {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const { onLogout } = useAuthContext();

  return (
    <>
      <div>
        <Link to="/">
          <button onClick={onLogout}>Log out</button>
        </Link>
        <div>
          <img src={user.avatar_url} alt="프로필 이미지" />
          <p>{user.username}</p>
        </div>
        <div>
          <button>Create room</button>
          <form>
            <input />
            <button>Join</button>
          </form>
        </div>
      </div>
    </>
  );
}
