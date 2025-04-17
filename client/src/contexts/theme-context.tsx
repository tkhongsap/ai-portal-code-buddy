import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ActiveTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  activeTheme: ActiveTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  prefersReducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // The theme stored in localStorage or set by user
  const [theme, setThemeState] = useState<Theme>('system');
  
  // The actual theme being displayed based on system preferences
  const [activeTheme, setActiveTheme] = useState<ActiveTheme>('light');
  
  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // This effect sets up media query listeners and initializes theme
  useEffect(() => {
    // Check for system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const systemPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // Initialize theme state
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    
    // Initialize reduced motion state
    setPrefersReducedMotion(systemPrefersReducedMotion.matches);
    
    // Function to update theme based on system preference
    const updateThemeFromSystem = () => {
      if (theme === 'system') {
        setActiveTheme(systemPrefersDark.matches ? 'dark' : 'light');
      }
    };
    
    // Function to update reduced motion preference
    const updateReducedMotion = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    // Add event listeners
    systemPrefersDark.addEventListener('change', updateThemeFromSystem);
    systemPrefersReducedMotion.addEventListener('change', updateReducedMotion);
    
    // Initial update
    updateThemeFromSystem();
    
    // Cleanup event listeners
    return () => {
      systemPrefersDark.removeEventListener('change', updateThemeFromSystem);
      systemPrefersReducedMotion.removeEventListener('change', updateReducedMotion);
    };
  }, [theme]);
  
  // This effect applies the active theme to the DOM
  useEffect(() => {
    // Handle initial theme (outside of system changes)
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Calculate the active theme based on preference and system
    let newActiveTheme: ActiveTheme;
    if (theme === 'system') {
      newActiveTheme = systemPrefersDark ? 'dark' : 'light';
    } else {
      newActiveTheme = theme as ActiveTheme;
    }
    
    // Update active theme state
    setActiveTheme(newActiveTheme);
    
    // Apply the theme to DOM
    if (newActiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply reduced motion class if needed
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [theme, prefersReducedMotion]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        activeTheme,
        setTheme, 
        toggleTheme, 
        prefersReducedMotion 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
