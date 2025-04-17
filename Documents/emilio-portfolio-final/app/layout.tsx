import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ScrollReset from '../components/ScrollReset' // ajustá ruta si hace falta

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Portfolio Emilio Funes',
  description: 'Desarrollador Backend | Java, Spring Boot, PHP, Laravel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased transition-colors duration-500`}>
        <ScrollReset />
        {children}
      </body>
    </html>
  )
}

