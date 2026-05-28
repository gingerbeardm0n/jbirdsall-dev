const projects = [
  {
    name: "jReader",
    description: "RSVP speed reader for EPUBs and PDFs. Upload a book, read faster.",
    status: "in progress",
    href: "https://reader.jbirdsall.dev",
  },
  {
    name: "Coming Soon",
    description: "Next side project — stay tuned.",
    status: "planned",
    href: "#",
  },
  {
    name: "Coming Soon",
    description: "Next side project — stay tuned.",
    status: "planned",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1 max-w-3xl mx-auto w-full px-6 py-24 gap-20">
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-50">
          Joel Birdsall
        </h1>
        <p className="text-xl text-zinc-400 max-w-xl">
          Software engineer. I build trading systems, web tools, and whatever
          else seems interesting.
        </p>
        <div className="flex gap-4 pt-2 text-sm text-zinc-500">
          <a
            href="https://github.com/gingerbeardm0n"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:joel.birdsall@gmail.com"
            className="hover:text-zinc-200 transition-colors"
          >
            Email
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-zinc-200">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.name + project.description}
              href={project.href}
              className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-zinc-100">{project.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    project.status === "in progress"
                      ? "bg-emerald-900/50 text-emerald-400"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
