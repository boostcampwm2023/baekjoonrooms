import { useContext } from 'react';
import { AuthContextType, AuthContext } from './AuthProvider';

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
