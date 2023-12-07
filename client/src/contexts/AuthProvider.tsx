import { useNavigate, useLocation } from 'react-router-dom';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { CreateUser } from '../types/CreateUserType';
import { logout } from '../apis/logout';
import { getSession } from '../apis/getSession';
import { useLocalStorage } from './LocalStorageProvider';

export interface AuthContextType {
  user: CreateUser | null;
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

  const [user, setUser] = useState<CreateUser | null>(null);

  const onLogout = () => {
    logout();
    setUser(null);
    removeItem('userInfo');
    navigate('/');
  };

  useEffect(() => {
    getSession().then((data) => {
      if (data) {
        setUser(data);
      }
    });
  }, [location]);

  return (
    <AuthContext.Provider value={{ user }}>
      <AuthUpdateContext.Provider value={{ onLogout }}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};
