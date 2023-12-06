import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthProvider';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
