import { createBrowserRouter } from 'react-router-dom';
import UserBasedRoute from './pages/UserBasedRoute.tsx';

import App from './App.tsx';
import Home from './pages/Home/Home.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Lobby from './pages/Lobby/Lobby.tsx';
import Room from './pages/Room/Room.tsx';
import Intro from './pages/Intro/Intro.tsx';
import { RoomProvider } from './contexts/RoomProvider.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.tsx';

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
            <RoomProvider>
              <Room />
            </RoomProvider>
          </UserBasedRoute>
        ),
      },
      {
        path: '/intro',
        element: <Intro />,
      },
      {
        path: '/privacyPolicy',
        element: <PrivacyPolicy />,
      },
    ],
  },
]);
