import { memo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group p-1 hover:bg-hover rounded-lg theme-transition ease-in-out transform hover:scale-105 active:scale-95"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {theme === 'light' ? (
          // Sun icon for light mode
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <path
              d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <path
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
