import { Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
