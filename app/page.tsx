import type { CSSProperties } from "react";
import StatusLine from "./status-line";

type Project = {
  name: string;
  description: string;
  status: string;
  href: string;
  gif?: string;
  beam: string;
};

// Pastel badges pulled from the VS Code dark syntax palette the site already uses.
const badges = [
  { label: "agent wrangler", color: "#c586c0" },
  { label: "MCP builder", color: "#dcdcaa" },
  { label: "AI-curious, AI-employed", color: "#ce9178" },
  { label: "Columbus, OH", color: "#9cdcfe" },
];

const services = [
  {
    name: "MCP servers & integrations",
    description:
      "Custom tools that let AI agents read the ticket, check the logs, and know what's deployed where — instead of guessing.",
  },
  {
    name: "Agentic dev workflows",
    description:
      "Skills, steering files, knowledge bases, and AI review loops that make a whole team faster, not just one person with a chatbot.",
  },
  {
    name: "Full-stack underneath",
    description:
      "Six years of React/TypeScript, Java (Spring, Quarkus), GraphQL, and Python — so the AI stuff ships into real production systems.",
  },
];

const projects: Project[] = [
  {
    name: "jTrader",
    description: "Real-time trading dashboard. Multi-strategy candidate scanner, live decision logic, position sizing, and trade logs. Paper trading simulation.",
    status: "live",
    href: "https://jtrader.jbirdsall.dev",
    gif: "/jtrader-preview.jpg",
    beam: "#4ec9b0",
  },
  {
    name: "jClimber",
    description: "2D rock-climbing game built from scratch in React. Playable in-browser.",
    status: "live",
    href: "/climber",
    gif: "/jclimber-demo.gif",
    beam: "#c586c0",
  },
  {
    name: "jReader",
    description: "RSVP speed reader for EPUBs and PDFs. Upload a book, read faster.",
    status: "live",
    href: "https://reader.jbirdsall.dev",
    gif: "/jreader-preview.jpg",
    beam: "#dcdcaa",
  },
  {
    name: "Chess",
    description: "Full playable chess with legal-move validation and promotion handling.",
    status: "live",
    href: "/chess",
    gif: "/chess-preview.jpg",
    beam: "#ce9178",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joel Birdsall",
  url: "https://www.jbirdsall.dev",
  jobTitle: "AI-native software engineer",
  description:
    "Builds MCP servers and AI agent workflows that plug AI into the tools teams already use.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbus",
    addressRegion: "OH",
    addressCountry: "US",
  },
  knowsAbout: [
    "Model Context Protocol (MCP)",
    "AI agents",
    "Agentic development workflows",
    "React",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Quarkus",
    "GraphQL",
    "Python",
  ],
  sameAs: [
    "https://linkedin.com/in/joel-birdsall",
    "https://github.com/gingerbeardm0n",
  ],
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[#6a9955] select-none">{"// "}</span>
      <h2 className="text-2xl lg:text-3xl font-semibold text-[#d4d4d4]">{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col flex-1 max-w-5xl mx-auto w-full px-6 lg:px-10 py-24 lg:py-32 gap-20 lg:gap-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero: boots like a terminal, printing top to bottom, then the status line types out */}
      <section className="flex flex-col gap-5">
        <div className="flex items-start gap-4 flex-wrap">
          <h1 className="boot-line text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#d4d4d4]">
            Joel Birdsall
          </h1>
          <div className="mt-3 lg:mt-5 flex gap-2 flex-wrap">
            {badges.map((badge, i) => (
              <span
                key={badge.label}
                className="boot-badge text-xs lg:text-sm px-3 py-1 rounded-full border font-mono"
                style={{
                  color: badge.color,
                  borderColor: `${badge.color}4d`,
                  backgroundColor: `${badge.color}1a`,
                  animationDelay: `${350 + i * 120}ms`,
                }}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
        <p
          className="boot-line text-xl lg:text-2xl font-medium text-[#d4d4d4] max-w-2xl"
          style={{ animationDelay: "900ms" }}
        >
          AI-native software engineer.
        </p>
        <p
          className="boot-line text-lg lg:text-xl text-[#a8a8a8] max-w-2xl leading-relaxed"
          style={{ animationDelay: "1100ms" }}
        >
          I build MCP servers and agent workflows that plug AI into the tools teams already live in — Jira, repos, logs, deploys.
          Every week I find something new it can do, and something it still needs a human for. Usually me.
          Six years in, I&apos;m as excited about building software as I was on day one (if not more), which I honestly didn&apos;t think was possible.
        </p>
        <StatusLine />
        <div
          className="boot-line flex gap-5 text-sm lg:text-base text-[#569cd6]"
          style={{ animationDelay: "1400ms" }}
        >
          <a
            href="https://github.com/gingerbeardm0n"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9cdcfe] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/joel-birdsall"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9cdcfe] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:joel.birdsall@gmail.com"
            className="hover:text-[#9cdcfe] transition-colors"
          >
            Email
          </a>
        </div>
      </section>

      {/* What I do */}
      <section className="boot-rest flex flex-col gap-6 lg:gap-8">
        <SectionHeading>What I do</SectionHeading>
        <div className="grid gap-4 lg:gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col gap-2 rounded-xl border border-[#3e3e42] bg-[#252526] p-5 lg:p-6"
            >
              <span className="font-medium text-[#dcdcaa] lg:text-lg">{service.name}</span>
              <p className="text-sm lg:text-base text-[#a8a8a8] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="boot-rest flex flex-col gap-6 lg:gap-8">
        <SectionHeading>Things I&apos;ve built for fun</SectionHeading>
        <div className="grid gap-4 lg:gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.name + project.description}
              href={project.href}
              style={{ "--beam": project.beam } as CSSProperties}
              className="beam-card flex flex-col gap-2 rounded-xl border border-[#3e3e42] bg-[#252526] p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-150 focus-visible:outline-none"
            >
              {project.gif && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.gif}
                  alt={`${project.name} gameplay preview`}
                  className="rounded-lg border border-zinc-800 w-full h-32 sm:h-40 lg:h-52 object-cover"
                />
              )}
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-zinc-100 lg:text-lg">{project.name}</span>
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
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Other Work: a compact list rather than another card grid */}
      <section className="boot-rest flex flex-col gap-6 lg:gap-8">
        <SectionHeading>Other work</SectionHeading>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherWork.map((project) => (
            <div key={project.name} className="flex flex-col gap-0.5">
              <dt className="font-mono text-sm lg:text-base text-[#9cdcfe]">{project.name}</dt>
              <dd className="text-sm lg:text-base text-[#a8a8a8] leading-relaxed">
                {project.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Contact */}
      <section className="boot-rest flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#3e3e42] bg-[#252526] px-6 py-4">
        <span className="text-sm text-[#a8a8a8]">Get in touch</span>
        <a
          href="mailto:joel.birdsall@gmail.com"
          className="font-mono text-sm text-[#569cd6] hover:text-[#9cdcfe] transition-colors"
        >
          joel.birdsall@gmail.com
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3e3e42] pt-8 flex items-center justify-between text-xs text-[#6e6e6e]">
        <span className="font-mono">Joel Birdsall · 2026</span>
        <a href="https://github.com/gingerbeardm0n" target="_blank" rel="noopener noreferrer" className="text-[#569cd6] hover:text-[#9cdcfe] transition-colors">GitHub</a>
      </footer>
    </main>
  );
}
