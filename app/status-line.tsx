"use client";

import { useSyncExternalStore } from "react";

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
];

// Picks a status by calendar day, so it rotates daily for every visitor.
function statusForToday() {
  const now = new Date();
  const day = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000,
  );
  return statuses[day % statuses.length];
}

// The day doesn't need live updates, so there's nothing to subscribe to.
const subscribe = () => () => {};

export default function StatusLine() {
  // Server renders the first status; the client swaps in today's after hydration.
  const status = useSyncExternalStore(
    subscribe,
    statusForToday,
    () => statuses[0],
  );

  return (
    <p className="font-mono text-sm text-[#6a9955]">
      {"// "}Current status: {status} 🤖
    </p>
  );
}
