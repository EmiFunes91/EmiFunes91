import ContactForm from './ContactForm'

export default function Contact({
  title,
  description,
  buttonText,
  language
}: {
  title: string
  description: string
  buttonText: string
  language: 'es' | 'en'
}) {
  return (
    <section className="mt-20 text-center" id="contacto">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-300 mb-6">{description}</p>
      <ContactForm language={language} />
    </section>
  )
}


  