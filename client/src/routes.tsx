import { createBrowserRouter } from 'react-router-dom';
import UserBasedRoute from './pages/UserBasedRoute.tsx';

import App from './App.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import Lobby from './pages/Lobby.tsx';
import Room from './pages/Room.tsx';
import Intro from './pages/Intro.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <UserBasedRoute>
            <Home />
          </UserBasedRoute>
        ),
      },
      {
        index: true,
        path: '/home',
        element: (
          <UserBasedRoute>
            <Home />
          </UserBasedRoute>
        ),
      },
      {
        path: '/lobby',
        element: (
          <UserBasedRoute>
            <Lobby />
          </UserBasedRoute>
        ),
      },
      {
        path: '/room/:roomId',
        element: (
          <UserBasedRoute>
            <Room />
          </UserBasedRoute>
        ),
      },
      {
        path: '/intro',
        element: <Intro />,
      },
    ],
  },
]);
