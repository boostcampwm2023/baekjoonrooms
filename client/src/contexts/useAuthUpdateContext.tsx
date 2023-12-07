import { useContext } from 'react';
import { AuthUpdateType, AuthUpdateContext } from './AuthProvider';

export const useAuthUpdateContext = (): AuthUpdateType => {
  const context = useContext(AuthUpdateContext);
  if (!context) {
    throw new Error('useAuthUpdateContext must be used within a AuthProvider');
  }
  return context;
};
