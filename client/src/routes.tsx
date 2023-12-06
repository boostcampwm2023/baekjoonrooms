import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute.tsx';

import App from './App.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import Lobby from './pages/Lobby.tsx';
import Room from './pages/Room.tsx';
import Landing from './pages/Landing.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        index: true,
        path: '/home',
        element: <Home />,
      },
      {
        path: '/lobby',
        element: (
          <ProtectedRoute>
            <Lobby />
          </ProtectedRoute>
        ),
      },
      {
        path: '/room/:roomId',
        element: (
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
