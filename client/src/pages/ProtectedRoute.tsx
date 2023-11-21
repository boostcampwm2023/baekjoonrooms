import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  if (!localStorage.getItem('user')) {
    return <Navigate to="/" replace />;
  } else {
  }

  return children;
}
