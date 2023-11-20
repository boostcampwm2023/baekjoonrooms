import { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../apis/Auth';
import { UserType } from '../types/UserType';

interface AuthContextType {
  user: UserType | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    console.log('AuthProvider');
    login().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
