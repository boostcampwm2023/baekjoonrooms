// localStorageContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface LocalStorageContextProps {
  children: ReactNode;
}

interface LocalStorageContextValue {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const LocalStorageContext = createContext<LocalStorageContextValue>(
  {} as LocalStorageContextValue,
);

export const LocalStorageProvider: React.FC<LocalStorageContextProps> = ({
  children,
}) => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) =>
    localStorage.setItem(key, value);
  const removeItem = (key: string) => localStorage.removeItem(key);

  const value: LocalStorageContextValue = {
    getItem,
    setItem,
    removeItem,
  };

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = (): LocalStorageContextValue => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      'useLocalStorage must be used within a LocalStorageProvider',
    );
  }
  return context;
};
