'use client';

import Link from 'next/link';
import {
  Menu,
  X,
  Home,
  User,
  Layers,
  Folder,
  MessageCircle,
  Send
} from 'lucide-react';
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import LanguageToggle from './LanguageToggle';
import { FaCode } from 'react-icons/fa';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function Navbar({
  darkMode,
  setDarkMode,
  language,
  setLanguage
}: {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: 'es' | 'en';
  setLanguage: (val: 'es' | 'en') => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      label: language === 'es' ? 'Inicio' : 'Home',
      href: '#inicio',
      icon: <Home className="w-4 h-4" />
    },
    {
      label: language === 'es' ? 'Sobre mí' : 'About',
      href: '#sobre-mi',
      icon: <User className="w-4 h-4" />
    },
    {
      label: language === 'es' ? 'Stack' : 'Tech',
      href: '#stack',
      icon: <Layers className="w-4 h-4" />
    },
    {
      label: language === 'es' ? 'Proyectos' : 'Projects',
      href: '#proyectos',
      icon: <Folder className="w-4 h-4" />
    },
    {
      label: language === 'es' ? 'Testimonios' : 'Testimonials',
      href: '#testimonios',
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      label: language === 'es' ? 'Contacto' : 'Contact',
      href: '#contacto',
      icon: <Send className="w-4 h-4" />
    }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400"
        >
          <FaCode className="w-5 h-5" />
          <span className="tracking-wider">Portfolio</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition flex items-center gap-2"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        {/* Mobile nav toggle */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
