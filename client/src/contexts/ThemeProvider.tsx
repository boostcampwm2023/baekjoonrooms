import React, { createContext, ReactNode, useState, useEffect } from 'react';

import { useLocalStorage } from '../contexts/LocalStorageProvider';

type Theme =
  | 'atom-one-dark'
  | 'atom-one-light'
  | 'github-dark'
  | 'github-light';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

interface ThemeProviderProps {
  children: ReactNode;
}

const localStorageKey = 'theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { getItem, setItem } = useLocalStorage();

  const storedTheme = getItem(localStorageKey) as Theme | null;

  const [theme, setTheme] = useState<Theme>(storedTheme || 'atom-one-dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setItem(localStorageKey, theme);
  }, [setItem, theme]);

  // TODO: change setting function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      switch (prevTheme) {
        case 'atom-one-dark':
          return 'atom-one-light';
        case 'atom-one-light':
          return 'github-dark';
        case 'github-dark':
          return 'github-light';
        case 'github-light':
          return 'atom-one-dark';
        default:
          return 'atom-one-dark';
      }
    });
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className="relative">{children}</div>
    </ThemeContext.Provider>
  );
};
