// ThemeProvider.tsx

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type Theme =
  | 'atom-one-dark'
  | 'atom-one-light'
  | 'github-dark'
  | 'github-light';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const localStorageKey = 'theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Retrieve theme from localStorage or use 'default' as the default value
  const storedTheme = localStorage.getItem(localStorageKey) as Theme | null;
  const [theme, setTheme] = useState<Theme>(storedTheme || 'atom-one-dark');

  useEffect(() => {
    // Update data-theme attribute when the theme changes
    document.documentElement.setAttribute('data-theme', theme);
    // Save the theme to localStorage
    localStorage.setItem(localStorageKey, theme);
  }, [theme]);

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

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
