export default function About({ title, text }: { title: string; text: string }) {
    return (
      <section className="mt-20 max-w-4xl mx-auto text-center" id="sobre-mi">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-300 leading-relaxed">{text}</p>
      </section>
    );
  }
  