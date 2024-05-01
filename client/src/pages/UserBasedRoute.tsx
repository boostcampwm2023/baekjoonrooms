import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAuthStatus } from '../apis/getAuthStatus';
import { getMyRoomCode } from '../apis/getMyRoomCode';

export default function UserBasedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const location = useLocation();
  const { isPending: authStatusIsPending, data: authStatus } = useQuery({
    queryKey: ['authStatus'],
    queryFn: getAuthStatus,
    staleTime: Infinity,
  });
  const { isPending: myRoomCodeIsPending, data: roomCode } = useQuery({
    queryKey: ['myRoomCode'],
    queryFn: getMyRoomCode,
    staleTime: Infinity,
  });

  const isNotLoggedIn =
    !authStatus && location.pathname !== '/' && location.pathname !== '/home';
  const isNotParticipatingRoom =
    authStatus && !roomCode && location.pathname !== '/lobby';
  const isParticipatingRoom =
    authStatus && roomCode && location.pathname !== `/room/${roomCode}`;

  if (authStatusIsPending || myRoomCodeIsPending) {
    // TODO: Add loading page
    return <div>Loading...</div>;
  }

  if (isNotLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isNotParticipatingRoom) {
    return <Navigate to="/lobby" replace />;
  }

  if (isParticipatingRoom) {
    return <Navigate to={`/room/${roomCode}`} replace />;
  }

  return children;
}
