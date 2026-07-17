# jbirdsall.dev

Personal portfolio site showcasing my projects, built with a VS Code-inspired dark theme.

![Portfolio](screenshot.png)

**Live:** [https://jbirdsall.dev](https://jbirdsall.dev)

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS 4
- [Vercel Analytics](https://vercel.com/analytics)
- Deployed on Vercel with a custom domain

## Features

- VS Code-inspired dark theme (`#1e1e1e` background, `#d4d4d4` text, `#569cd6` blue, `#6a9955` comment green)
- Live project demos:
  - **jTrader** — trading dashboard
  - **jClimber** — game
  - **Chess** — game
  - **jReader** — reading app
- Path-based rewrites (`/chess`, `/climber`) proxying to standalone Vercel deployments
- "Other Work" section highlighting additional projects

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
