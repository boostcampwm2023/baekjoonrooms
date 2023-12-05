import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import { CreateUser } from '../types/CreateUserType';
import { getSession, logout } from '../apis/Auth';

interface AuthContextType {
  user: CreateUser | null;
}

interface AuthUpdateType {
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const AuthUpdateContext = createContext<AuthUpdateType>({} as AuthUpdateType);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<CreateUser | null>(null);

  const onLogout = () => {
    try {
      logout();
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await getSession();

        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      <AuthUpdateContext.Provider value={{ onLogout }}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export const useAuthUpdateContext = () => useContext(AuthUpdateContext);
