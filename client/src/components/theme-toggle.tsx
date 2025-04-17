import React from 'react';
import { useTheme } from '@/contexts/theme-context';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { activeTheme, toggleTheme } = useTheme();
  const isDark = activeTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`cb-theme-toggle ${className}`}
      aria-pressed={isDark}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="cb-visually-hidden">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

export default ThemeToggle;