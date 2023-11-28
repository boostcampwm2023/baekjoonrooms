import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from '../types/UserType';
import axios from 'axios';

interface AuthContextType {
  user: UserType | null;
}

interface AuthUpdateType {
  onLogout: () => void;
}

const baseURL = import.meta.env.VITE_BASE_URL;

// TODO: 서버의 세션 확인 api가 개발 되면 그때 localStorage로직을 변경

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const AuthUpdateContext = createContext<AuthUpdateType>({} as AuthUpdateType);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  // 새로고침하면 여기서 다시 user가 null이 되어, 로그인이 풀린다...
  const [user, setUser] = useState<UserType | null>(null);

  const onLogout = () => {
    // TODO: waiting for server api
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    async function getSession() {
      const response = await axios.get(`${baseURL}/session`, {
        withCredentials: true,
      });
      return response;
    }

    getSession().then((session) => {
      if (session) {
        setUser(session.data);
      } else {
        setUser(null);
      }
    });
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
