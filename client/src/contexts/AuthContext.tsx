import { createContext, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({
  children,
  value,
}: {
  children: JSX.Element;
  value: any;
}) => {
  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
