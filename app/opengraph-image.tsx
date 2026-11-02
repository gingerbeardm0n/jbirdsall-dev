import { ImageResponse } from "next/og";

// Link-preview card shown when the site is shared (LinkedIn, Slack, iMessage, etc.).
export const alt =
  "Joel Birdsall, AI-native software engineer. MCP servers and agent workflows.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const badges = [
  { label: "agent wrangler", color: "#c586c0" },
  { label: "MCP builder", color: "#dcdcaa" },
  { label: "AI-curious, AI-employed", color: "#ce9178" },
  { label: "Columbus, OH", color: "#9cdcfe" },
];

const status = "teaching robots to read Jira tickets.";
const tagline =
  "I learned to code the hard way, before AI. Now I teach AI agents to do it with me.";

// Fetches just the glyphs we need from Google Fonts at build time. Returns null on
// failure so the card still renders with the default font instead of breaking the build.
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const res = await fetch(match[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const sansText = `Joel Birdsall AI-native software engineer. ${tagline}`;
  const monoText = `${badges.map((b) => b.label).join("")}// Current status: ${status}▍jbirdsall.dev`;

  const [sansBold, sansRegular, mono] = await Promise.all([
    loadGoogleFont("IBM+Plex+Sans", 700, sansText),
    loadGoogleFont("IBM+Plex+Sans", 400, sansText),
    loadGoogleFont("JetBrains+Mono", 400, monoText),
  ]);

  const fonts = [
    sansBold && { name: "Plex", data: sansBold, weight: 700 as const, style: "normal" as const },
    sansRegular && { name: "Plex", data: sansRegular, weight: 400 as const, style: "normal" as const },
    mono && { name: "JetBrains", data: mono, weight: 400 as const, style: "normal" as const },
  ].filter((f) => f !== null && f !== undefined);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1e1e1e",
          fontFamily: "Plex",
        }}
      >
        {/* Editor-style tab bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: 56,
            padding: "0 32px",
            backgroundColor: "#252526",
            borderBottom: "1px solid #3e3e42",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#c586c0" }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#dcdcaa" }} />
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#4ec9b0" }} />
          <div
            style={{
              display: "flex",
              marginLeft: 24,
              fontFamily: "JetBrains",
              fontSize: 20,
              color: "#858585",
            }}
          >
            jbirdsall.dev
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "56px 72px 48px",
          }}
        >
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: "#d4d4d4", letterSpacing: -2 }}>
            Joel Birdsall
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
            {badges.map((badge) => (
              <div
                key={badge.label}
                style={{
                  display: "flex",
                  fontFamily: "JetBrains",
                  fontSize: 22,
                  color: badge.color,
                  padding: "6px 18px",
                  borderRadius: 999,
                  border: `2px solid ${badge.color}4d`,
                  backgroundColor: `${badge.color}1a`,
                }}
              >
                {badge.label}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#d4d4d4", marginTop: 36 }}>
            AI-native software engineer.
          </div>
          {/* One sentence per line so neither wraps awkwardly */}
          <div style={{ display: "flex", flexDirection: "column", fontSize: 30, lineHeight: 1.35, color: "#a8a8a8", marginTop: 12 }}>
            {tagline.split(/(?<=\.) /).map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontFamily: "JetBrains",
              fontSize: 26,
              color: "#6a9955",
            }}
          >
            {`// Current status: ${status}`}
            <span style={{ color: "#4ec9b0", marginLeft: 4 }}>▍</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
