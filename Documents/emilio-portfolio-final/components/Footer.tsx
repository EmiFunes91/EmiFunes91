'use client'

export default function Footer({ language }: { language: 'es' | 'en' }) {
  const t = {
    es: {
      rights: '© 2025 Emilio Funes. Todos los derechos reservados.',
      built: 'Sitio construido con Next.js + Tailwind CSS',
    },
    en: {
      rights: '© 2025 Emilio Funes. All rights reserved.',
      built: 'Site built with Next.js + Tailwind CSS',
    },
  }

  const tLang = t[language]

  return (
    <footer className="mt-20 py-6 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>{tLang.rights}</p>
      <p className="text-xs mt-1">{tLang.built}</p>
    </footer>
  )
}
