"use client";

import { Fragment, useEffect, useRef } from "react";

// The page background, styled like an open editor: a cool gradient with film grain,
// line numbers down the left edge, and syntax-highlighted code that is nearly
// invisible until the pointer's glow passes over it. On touch devices (no hover)
// the glow just rests near the top of the page.

const LINE_HEIGHT = 24;
const GUTTER_PAD = 12;
const GUTTER_LINES = 400;

// «x|text» marks a highlighted token; x picks the color (see .tok-* in globals.css).
// Snippets sit in the empty space between sections: `top` is page px, `left` is px
// from the page's center line. Positions match the layout at >=1200px wide (the only
// widths that show code), so revisit them if section heights change.
const snippets = [
  {
    top: 56,
    left: 240,
    lines: [
      "«c|// jira-context.ts — gives the agent the ticket, not a guess»",
      "«k|import» { «t|McpServer» } «k|from» «s|\"@modelcontextprotocol/sdk/server\"»;",
      "«k|import» { «v|z» } «k|from» «s|\"zod\"»;",
      "",
      "«k|const» «v|server» = «k|new» «t|McpServer»({ «v|name»: «s|\"jira-context\"», «v|version»: «s|\"1.0.0\"» });",
      "",
      "«v|server».«f|tool»(",
      "  «s|\"get_ticket\"»,",
      "  «s|\"Fetch a Jira ticket with acceptance criteria\"»,",
      "  { «v|key»: «v|z».«f|string»() },",
      "  «k|async» ({ «v|key» }) => {",
      "    «k|const» «v|ticket» = «k|await» «f|jira».«f|getIssue»(«v|key»);",
      "    «k|return» { «v|content»: [{ «v|type»: «s|\"text\"», «v|text»: «f|summarize»(«v|ticket») }] };",
      "  }",
      ");",
      "",
      "«v|server».«f|tool»(«s|\"whats_deployed\"», «s|\"Which build is live in each env\"», {}, «f|deployTracker»);",
      "",
      "«c|// TODO: teach it to stop apologizing»",
      "«k|await» «v|server».«f|connect»(«k|new» «t|StdioServerTransport»());",
    ],
  },
  {
    top: 664,
    left: 20,
    lines: [
      "«c|# .kiro/steering/house-rules.md»",
      "«v|-» «s|Read the ticket before touching the code.»",
      "«v|-» «s|Run the tests. Then run them again.»",
      "«v|-» «s|If you're guessing, ask.»",
    ],
  },
  {
    top: 1034,
    left: 60,
    lines: [
      "«c|// jclimber/physics.ts»",
      "«k|const» «v|GRAVITY» = «s|9.81»; «c|// tuned by falling off things»",
      "«k|export function» «f|step»(«v|climber»: «t|Body», «v|dt»: «t|number») {",
      "  «v|climber».«v|vy» += «v|GRAVITY» * «v|dt»;",
    ],
  },
  {
    top: 1950,
    left: 20,
    lines: [
      "«v|$» «f|git log» «s|--oneline»",
      "«t|a2a0caf» «s|boot sequence, beams, SEO»",
      "«t|819e554» «s|copy and badges»",
      "«t|3f1e9c7» «s|link preview card»",
    ],
  },
  {
    top: 2300,
    left: 60,
    lines: [
      "«k|SELECT» «v|idea» «k|FROM» «v|side_projects»",
      "«k|WHERE» «v|fun» = «k|true» «k|AND» «v|finished» = «k|maybe»",
      "«k|ORDER BY» «v|excitement» «k|DESC»;",
    ],
  },
  {
    top: 2630,
    left: -480,
    lines: [
      "«v|$» «f|npm run» «s|deploy»",
      "«c|✓ shipped to jbirdsall.dev»",
    ],
  },
];

// Left-margin code runs alongside the content, starting just right of the gutter and
// fading out before it reaches the real text (see .bg-code__side in globals.css).
const sideSnippets = [
  {
    top: 340,
    lines: [
      "{",
      "  «s|\"mcpServers\"»: {",
      "    «s|\"jira\"»: { «s|\"command\"»: «s|\"npx\"», «s|\"args\"»: [«s|\"jira-mcp\"»] },",
      "    «s|\"deploys\"»: { «s|\"command\"»: «s|\"node\"», «s|\"args\"»: [«s|\"deploy-tracker\"»] },",
      "    «s|\"playwright\"»: { «s|\"command\"»: «s|\"npx\"», «s|\"args\"»: [«s|\"@playwright/mcp\"»] }",
      "  }",
      "}",
    ],
  },
  {
    top: 780,
    lines: [
      "«f|test»(«s|\"status line types out\"», «k|async» ({ «v|page» }) => {",
      "  «k|await» «v|page».«f|goto»(«s|\"/\"»);",
      "  «k|await» «f|expect»(«v|page».«f|getByText»(«s|\"Current status\"»)).«f|toBeVisible»();",
      "});",
    ],
  },
  {
    top: 1240,
    lines: [
      "«t|@RestController»",
      "«k|class» «t|StatusController» {",
      "  «t|@GetMapping»(«s|\"/status\"»)",
      "  «t|String» «f|status»() {",
      "    «k|return» «s|\"teaching robots to read Jira tickets\"»;",
      "  }",
      "}",
    ],
  },
  {
    top: 1680,
    lines: [
      "«v|on»: [«s|pull_request»]",
      "«v|jobs»:",
      "  «v|review»:",
      "    «v|runs-on»: «s|ubuntu-latest»",
      "    «v|steps»:",
      "      «v|-» «v|run»: «s|npm run ai-review -- --diff origin/main»",
    ],
  },
  {
    top: 2140,
    lines: [
      "«k|def» «f|review»(«v|pr»):",
      "    «v|findings» = «v|agent».«f|review»(«v|pr».«v|diff»)",
      "    «k|return» [«v|f» «k|for» «v|f» «k|in» «v|findings» «k|if» «v|f».«v|confident»]",
    ],
  },
  {
    top: 2440,
    lines: [
      "«k|query» «t|Ticket»(«v|$key»: «t|ID!») {",
      "  «f|issue»(«v|key»: «v|$key») {",
      "    «v|summary»",
      "    «v|acceptanceCriteria»",
      "  }",
      "}",
    ],
  },
];

function Line({ src }: { src: string }) {
  const parts = src.split(/«(\w)\|([^»]*)»/);
  return (
    <div>
      {parts.map((part, i) => {
        if (i % 3 === 0) return <Fragment key={i}>{part}</Fragment>;
        if (i % 3 === 1) return null;
        return (
          <span key={i} className={`tok-${parts[i - 1]}`}>
            {part}
          </span>
        );
      })}
      {src === "" && " "}
    </div>
  );
}

function Code() {
  return (
    <>
      {snippets.map((snippet) => (
        <div
          key={snippet.top}
          className="bg-code__snippet"
          style={{ top: snippet.top, left: `calc(50% + ${snippet.left}px)` }}
        >
          {snippet.lines.map((line, i) => (
            <Line key={i} src={line} />
          ))}
        </div>
      ))}
      {sideSnippets.map((snippet) => (
        <div key={snippet.top} className="bg-code__snippet bg-code__side" style={{ top: snippet.top }}>
          {snippet.lines.map((line, i) => (
            <Line key={i} src={line} />
          ))}
        </div>
      ))}
    </>
  );
}

const gutterNumbers = Array.from({ length: GUTTER_LINES }, (_, i) => i + 1).join("\n");

export default function BackgroundGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let x = -1000;
    let y = -1000;

    const paint = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const pageY = y + window.scrollY;
        const line = Math.max(0, Math.floor((pageY - GUTTER_PAD) / LINE_HEIGHT));
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.style.setProperty("--px", `${x}px`);
        el.style.setProperty("--py", `${pageY}px`);
        el.style.setProperty("--line-top", `${GUTTER_PAD + line * LINE_HEIGHT}px`);
      });
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      paint();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", paint, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", paint);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="bg-editor">
      <div className="bg-editor__base" />
      <div className="bg-editor__page">
        <div className="bg-code bg-code--dim">
          <Code />
        </div>
        <div className="bg-code bg-code--lit">
          <Code />
        </div>
        <div className="bg-gutter">{gutterNumbers}</div>
        <div className="bg-gutter bg-gutter--lit">{gutterNumbers}</div>
        <div className="bg-line" />
      </div>
      <div className="bg-editor__light" />
    </div>
  );
}
