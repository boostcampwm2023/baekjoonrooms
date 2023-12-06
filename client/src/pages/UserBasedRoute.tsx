import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthProvider';

export default function UserBasedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAuthContext();
  const location = useLocation();

  console.log(location.pathname);
  if (user) {
    if (location.pathname === '/' || location.pathname === '/home') {
      return <Navigate to="/lobby" replace />;
    }
  } else {
    if (location.pathname !== '/' && location.pathname !== '/home') {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
