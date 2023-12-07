import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserSession } from '../types/UserSessionType';
import { logout } from '../apis/logout';
import { getSession } from '../apis/getSession';
import { useLocalStorage } from './LocalStorageProvider';

interface AuthContextType {
  user: UserSession | null;
}

export interface AuthUpdateType {
  onLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
export const AuthUpdateContext = createContext<AuthUpdateType>(
  {} as AuthUpdateType,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { removeItem } = useLocalStorage();

  const [user, setUser] = useState<UserSession | null>(null);

  const onLogout = async () => {
    await logout();
    // setUser(null);
    removeItem('userInfo');
    navigate('/');
  };

  useEffect(() => {
    getSession().then((data) => {
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
    });
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user }}>
      <AuthUpdateContext.Provider value={{ onLogout }}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};
