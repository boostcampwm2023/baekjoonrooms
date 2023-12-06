import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthProvider';
import Lobby from './Lobby';
import Home from './Home';

export default function UserBasedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAuthContext();
  const location = useLocation();

  console.log(user);
  if (user) {
    if (user.participatingRoomCode) {
      if (location.pathname !== `/room/${user.participatingRoomCode}`) {
        return (
          <Navigate
            to={`/room/${user.participatingRoomCode}`}
            state={{ isHost: true, roomCode: user.participatingRoomCode }}
            replace
          />
        );
      }
    } else {
      if (location.pathname !== '/lobby') {
        return <Navigate to="/lobby" replace />;
      } else <Lobby />;
    }
  } else {
    if (location.pathname !== '/' && location.pathname !== '/home') {
      return <Navigate to="/" replace />;
    } else <Home />;
  }

  return children;
}
