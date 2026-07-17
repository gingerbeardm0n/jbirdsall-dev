type Project = {
  name: string;
  description: string;
  status: string;
  href: string;
  gif?: string;
};

const projects: Project[] = [
  {
    name: "jTrader",
    description: "Real-time trading dashboard. Multi-strategy candidate scanner, live decision logic, position sizing, and trade logs. Paper trading simulation.",
    status: "live",
    href: "https://jtrader.jbirdsall.dev",
    gif: "/jtrader-preview.jpg",
  },
  {
    name: "jClimber",
    description: "2D rock-climbing game built from scratch in React. Playable in-browser.",
    status: "live",
    href: "/climber",
    gif: "/jclimber-demo.gif",
  },
  {
    name: "jReader",
    description: "RSVP speed reader for EPUBs and PDFs. Upload a book, read faster.",
    status: "live",
    href: "https://reader.jbirdsall.dev",
    gif: "/jreader-preview.jpg",
  },
  {
    name: "Chess",
    description: "Full playable chess with legal-move validation and promotion handling.",
    status: "live",
    href: "/chess",
    gif: "/chess-preview.jpg",
  },
];

const otherWork = [
  { name: "jCoin", description: "24/7 crypto-perps momentum scalping bot." },
  { name: "jSwing", description: "Autonomous US-equities swing-trading algo." },
  { name: "jPlanner", description: "Personal life orchestrator and accountability system." },
  { name: "jChef", description: "Home meal planning and grocery automation." },
  { name: "bounty-scanner", description: "Finds and ranks winnable open-source bounties." },
  { name: "linkpatrol", description: "Affiliate link health scanner for dead/losing links." },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1 max-w-3xl mx-auto w-full px-6 py-24 gap-20">
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <div className="flex items-start gap-4 flex-wrap">
          <h1 className="text-5xl font-bold tracking-tight text-[#d4d4d4]">
            Joel Birdsall
          </h1>
          <span className="mt-3 text-xs px-3 py-1 rounded-full border border-[#2a5040] bg-[#1b3a2e] text-[#4ec9b0] font-mono">
            open to roles
          </span>
        </div>
        <p className="text-xl text-[#858585] max-w-xl">
          Software engineer. Games, tools, dashboards, bots — if it seems fun to build, I build it.
        </p>
        <div className="flex gap-4 pt-2 text-sm text-[#569cd6]">
          <a
            href="https://github.com/gingerbeardm0n"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9cdcfe] transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#6a9955] select-none">{"// "}</span>
          <h2 className="text-2xl font-semibold text-[#d4d4d4]">Projects</h2>
        </div>
        <div className="grid gap-4 grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.name + project.description}
              href={project.href}
              className="flex flex-col gap-2 rounded-xl border border-[#3e3e42] bg-[#252526] p-5 hover:border-[#569cd6] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-150"
            >
              {project.gif && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.gif}
                  alt={`${project.name} gameplay preview`}
                  className="rounded-lg border border-zinc-800 w-full h-32 object-cover"
                />
              )}
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-zinc-100">{project.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    project.status === "live"
                      ? "bg-[#1b3a2e] text-[#4ec9b0]"
                      : "bg-[#2d2d2d] text-[#858585]"
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

      {/* Other Work */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#6a9955] select-none">{"// "}</span>
          <h2 className="text-2xl font-semibold text-[#d4d4d4]">Other Work</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherWork.map((project) => (
            <div
              key={project.name}
              className="flex flex-col gap-2 rounded-xl border border-[#3e3e42] p-5"
            >
              <span className="font-medium text-zinc-100">{project.name}</span>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Contact */}
      <section className="flex items-center justify-between rounded-xl border border-[#3e3e42] bg-[#252526] px-6 py-4">
        <span className="text-sm text-[#858585]">Get in touch</span>
        <span className="font-mono text-sm text-[#569cd6]">joel.birdsall@gmail.com</span>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3e3e42] pt-8 flex items-center justify-between text-xs text-[#4e4e4e]">
        <span className="font-mono">Joel Birdsall · 2026</span>
        <a href="https://github.com/gingerbeardm0n" target="_blank" rel="noopener noreferrer" className="text-[#569cd6] hover:text-[#9cdcfe] transition-colors">GitHub</a>
      </footer>
    </main>
  );
}
