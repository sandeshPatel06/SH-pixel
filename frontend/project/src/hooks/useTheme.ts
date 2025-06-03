import { useEffect } from 'react';
import { usePhotoContext } from '../context/PhotoContext';

export const useTheme = () => {
  const { themeMode, setThemeMode } = usePhotoContext();

  useEffect(() => {
    // Check system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeMode(e.matches ? 'dark' : 'light');
    };

    // Set initial theme based on system preference
    setThemeMode(mediaQuery.matches ? 'dark' : 'light');

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setThemeMode]);

  return { themeMode, setThemeMode };
};