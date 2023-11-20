import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAuthContext();
  if (!user) {
    console.log('ProtectedRoute: user is null');
    return <Navigate to="/" replace />;
  }

  return children;
}
