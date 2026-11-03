import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import BackgroundGlow from "./background-glow";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const title = "Joel Birdsall | AI-native software engineer in Columbus, OH";
const description =
  "Joel Birdsall builds MCP servers and AI agent workflows that plug AI into the tools teams already use: Jira, repos, logs, and deploys. Full-stack React/TypeScript and Java engineer based in Columbus, Ohio.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jbirdsall.dev"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Joel Birdsall",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col font-sans text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
        <BackgroundGlow />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
