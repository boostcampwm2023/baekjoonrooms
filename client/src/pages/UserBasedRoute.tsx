import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function UserBasedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, isLoading, setIsLoading } = useAuthContext();
  const location = useLocation();

  if (!isLoading) {
    const isNotLoggedIn =
      !user && location.pathname !== '/' && location.pathname !== '/home';
    const isNotParticipatingRoom =
      user && !user.participatingRoomCode && location.pathname !== '/lobby';
    const isParticipatingRoom =
      user &&
      user.participatingRoomCode &&
      location.pathname !== `/room/${user.participatingRoomCode}`;

    setIsLoading(true);

    if (isNotLoggedIn) {
      return <Navigate to="/" replace />;
    }

    if (isNotParticipatingRoom) {
      return <Navigate to="/lobby" replace />;
    }

    if (isParticipatingRoom) {
      return (
        <Navigate
          to={`/room/${user.participatingRoomCode}`}
          state={{
            isHost: user.isHost,
            roomCode: user.participatingRoomCode,
          }}
          replace
        />
      );
    }
  }

  return children;
}
