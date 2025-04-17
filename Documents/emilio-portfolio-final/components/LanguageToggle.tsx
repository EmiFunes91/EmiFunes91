'use client';
import { IoLanguage } from 'react-icons/io5';

export default function LanguageToggle({
  language,
  setLanguage,
}: {
  language: 'es' | 'en';
  setLanguage: (val: 'es' | 'en') => void;
}) {
  const handleToggle = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    localStorage.setItem('portfolio-lang', newLang);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 px-3 flex items-center gap-1 rounded-full border border-gray-400 hover:bg-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 transition text-sm font-semibold"
      title={language === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
    >
      <IoLanguage className="w-4 h-4" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}



