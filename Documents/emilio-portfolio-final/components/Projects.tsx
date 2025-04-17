export default function Projects({ title }: { title: string }) {
  return (
    <section className="mt-20 max-w-5xl mx-auto" id="proyectos">
      <h2 className="text-3xl font-semibold mb-6 text-center">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sistema de Gestión Comercial</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400 mt-2 mb-4">
            Plataforma completa con módulos de usuarios, compras y facturación. Spring Boot, PostgreSQL, lógica empresarial sólida.
          </p>
          <div className="flex justify-between text-sm">
            <a href="https://github.com/EmiFunes91/store" className="underline text-blue-600 dark:text-blue-400" target="_blank">Ver código</a>
            <a href="https://www.fiverr.com/portfolio/demo-store" className="underline text-blue-600 dark:text-blue-400" target="_blank">Ver demo</a>
          </div>
        </div>

        <div className="p-6 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">QuickTasks (App de tareas)</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400 mt-2 mb-4">
            App de gestión de tareas moderna: React frontend + backend Spring Boot con JWT. Desplegada en GitHub Pages.
          </p>
          <div className="flex justify-between text-sm">
            <a href="https://github.com/EmiFunes91/quicktasks" className="underline text-blue-600 dark:text-blue-400" target="_blank">Ver código</a>
            <a href="https://emilio-organization.github.io/quicktasks" className="underline text-blue-600 dark:text-blue-400" target="_blank">Ver demo</a>
          </div>
        </div>
      </div>
    </section>
  );
}
