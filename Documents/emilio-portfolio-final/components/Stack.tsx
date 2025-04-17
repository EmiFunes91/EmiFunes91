import {
    Code2,
    Database,
    Server,
    TerminalSquare
  } from 'lucide-react';
  import {
    FaJava,
    FaLaravel,
    FaDocker,
    FaReact
  } from 'react-icons/fa';
  
  export default function Stack({ title }: { title: string }) {
    return (
      <section className="mt-20 max-w-6xl mx-auto" id="stack">
        <h2 className="text-3xl font-semibold mb-6 text-center">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-gray-600 dark:text-gray-300">
          <div className="flex flex-col items-center gap-2"><FaJava className="w-8 h-8" />Java / Spring Boot</div>
          <div className="flex flex-col items-center gap-2"><FaLaravel className="w-8 h-8" />PHP / Laravel</div>
          <div className="flex flex-col items-center gap-2"><Database className="w-8 h-8" />PostgreSQL / MySQL</div>
          <div className="flex flex-col items-center gap-2"><Code2 className="w-8 h-8" />REST APIs / JWT</div>
          <div className="flex flex-col items-center gap-2"><FaDocker className="w-8 h-8" />Docker / Git</div>
          <div className="flex flex-col items-center gap-2"><TerminalSquare className="w-8 h-8" />CI/CD</div>
          <div className="flex flex-col items-center gap-2"><FaReact className="w-8 h-8" />React / Next.js</div>
          <div className="flex flex-col items-center gap-2"><Server className="w-8 h-8" />Tailwind / Bootstrap</div>
        </div>
      </section>
    );
  }
  