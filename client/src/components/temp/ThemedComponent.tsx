// ThemeSwitcherDropdown.tsx

import { useTheme } from '../../contexts/useTheme';

export default function ThemeComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="absolute top-0 inline-flex w-[20%] justify-center border bg-default_white px-4 py-2 text-sm font-medium shadow-sm"
      onClick={toggleTheme}>
      {`${theme}`}
    </button>
  );
}
