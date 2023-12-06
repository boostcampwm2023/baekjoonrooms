import { Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { AuthProvider } from './contexts/AuthProvider';
import { ThemeProvider } from './contexts/ThemeProvider';
import ThemeComponent from './components/temp/ThemedComponent';
import { LocalStorageProvider } from './contexts/LocalStorageProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LocalStorageProvider>
          <ThemeProvider>
            <ThemeComponent />
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </ThemeProvider>
        </LocalStorageProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
