'use client'

import { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'

const testimonios = [
  {
    quote: "Emilio demostró compromiso, proactividad y capacidad técnica. Recomendado 100%.",
    client: "Cliente en Fiverr"
  },
  {
    quote: "Un desarrollador confiable que entrega código limpio y mantiene una excelente comunicación.",
    client: "Startup de software"
  },
  {
    quote: "Excelente experiencia trabajando con Emilio. Siempre va más allá para que todo funcione perfecto.",
    client: "Emprendedor independiente"
  }
]

export default function Testimonials({ title }: { title: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % testimonios.length), 5000)
    return () => clearInterval(interval)
  }, [])

  const { quote, client } = testimonios[index]

  return (
    <section className="mt-20 max-w-4xl mx-auto" id="testimonios">
      <h2 className="text-3xl font-semibold mb-6 text-center">{title}</h2>
      <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent text-center transition-all duration-500">
        <Quote className="mx-auto mb-2 text-blue-600 dark:text-blue-400" />
        <p className="italic text-gray-700 dark:text-gray-300 transition-opacity duration-500">
          "{quote}"
        </p>
        <p className="text-sm text-gray-500 mt-2">– {client}</p>
      </div>
    </section>
  )
}

