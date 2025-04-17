'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

export default function DarkModeToggle({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  useEffect(() => {
    // Si el usuario nunca eligió, seguir preferencia del sistema
    const saved = localStorage.getItem('portfolio-theme');
    if (!saved) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.setItem('portfolio-theme', prefersDark ? 'dark' : 'light');
    }
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('portfolio-theme', newValue ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 transition"
      title={darkMode ? 'Cambiar a claro' : 'Switch to dark'}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

