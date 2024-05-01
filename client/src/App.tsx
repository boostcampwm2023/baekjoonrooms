import { Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ThemeProvider } from './contexts/ThemeProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
