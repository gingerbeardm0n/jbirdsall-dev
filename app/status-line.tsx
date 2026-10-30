"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const statuses = [
  "teaching robots to read Jira tickets. They're getting suspiciously good at it.",
  "asking AI to do things I'm pretty sure it can't. It keeps proving me wrong.",
  "running more AI sessions in parallel than is probably reasonable.",
  "my AI agents now have more tools than I do. Working on it.",
  "writing docs nobody asked for, because the robot makes it basically free.",
  "explaining to an agent, for the third time, how I like my commits.",
  "building an MCP server so the agents stop asking me what's deployed where.",
  "finding out what AI can't do, one confidently wrong answer at a time.",
  "pair programming with three agents and one slightly outnumbered human.",
  "turning \"there's no way AI can do this\" into \"huh, it actually can.\"",
  "my friends started calling me \"the AI guy.\" I've stopped correcting them.",
  "fair warning: ask me about agents and you'll lose an hour.",
  "it feels like recess again, and AI is the best sandbox on the playground.",
  "more excited about this stuff than any grown adult probably should be.",
];

// First status types once the hero lines above it have printed; later ones start right away.
const TYPE_START_MS = 1450;
const RETYPE_START_MS = 150;
const TYPE_CHAR_MS = 28;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Days since the epoch, so the starting status rotates daily for every visitor.
function dayIndex() {
  const now = new Date();
  return Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000,
  );
}

// The day doesn't need live updates, so there's nothing to subscribe to.
const subscribeNever = () => () => {};

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function StatusLine() {
  // Server renders the first status; the client swaps in today's after hydration.
  const day = useSyncExternalStore(subscribeNever, dayIndex, () => 0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  // How many times the visitor has asked for another status.
  const [skips, setSkips] = useState(0);
  const [typed, setTyped] = useState(0);

  const status = statuses[(day + skips) % statuses.length];

  useEffect(() => {
    if (reducedMotion) return;
    let count = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(
      () => {
        interval = setInterval(() => {
          count += 1;
          setTyped(count);
          if (count >= status.length) clearInterval(interval);
        }, TYPE_CHAR_MS);
      },
      skips === 0 ? TYPE_START_MS : RETYPE_START_MS,
    );
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [status, reducedMotion, skips]);

  function showNext() {
    setTyped(0);
    setSkips((n) => n + 1);
  }

  const shown = reducedMotion ? status : status.slice(0, typed);

  return (
    <div
      className="boot-line flex flex-col items-start gap-2"
      style={{ animationDelay: "1300ms" }}
    >
      <p
        className="font-mono text-sm lg:text-base text-[#6a9955] leading-relaxed min-h-[3.25rem] sm:min-h-[2.75rem]"
        aria-live="polite"
      >
        <span className="sr-only">Current status: {status}</span>
        <span aria-hidden="true">
          {"// "}Current status: {shown}
          <span className="caret text-[#4ec9b0]">▍</span>
        </span>
      </p>
      <button
        type="button"
        onClick={showNext}
        className="font-mono text-xs lg:text-sm px-3 py-1 rounded-md border border-[#2a5040] bg-[#1b3a2e] text-[#4ec9b0] hover:border-[#4ec9b0] hover:bg-[#21473a] transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ec9b0]"
      >
        ↻ check status again
      </button>
    </div>
  );
}
