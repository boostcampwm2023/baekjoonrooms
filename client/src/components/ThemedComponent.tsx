// ThemeSwitcherDropdown.tsx

import { useTheme } from '../contexts/ThemeProvider';

export default function ThemeComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="border-default-dark inline-flex w-full justify-center  border px-4 py-2 text-sm font-medium shadow-sm "
      onClick={toggleTheme}>
      {`Current theme: ${theme} (click to toggle)`}
    </button>
  );
}
