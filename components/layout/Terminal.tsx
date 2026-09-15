"use client";

import { useState, useEffect, useRef } from "react";

const TYPING_SPEED_MIN = 50;
const TYPING_SPEED_MAX = 80;
const PAUSE_AFTER_TYPING = 300;
const PAUSE_AFTER_OUTPUT = 800;
const PAUSE_BEFORE_PROMPT = 400;
const LOOP_DELAY = 2000;
const MAX_VISIBLE_LINES = 10;

type Line = {
  type: "input" | "output";
  text: string;
  color?: string;
};

function getTimeString(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

const COMMANDS = [
  {
    cmd: "git status",
    output: [
      "On branch main",
      "Your branch is up to date with 'origin/main'.",
      "",
      "Changes to be committed:",
      "  modified:   app/page.tsx",
      "  modified:   components/layout/Header.tsx",
      "  new file:   components/layout/Terminal.tsx",
    ],
    outputColor: "text-success",
  },
  {
    cmd: "npm run dev",
    output: [
      "",
      "  ▲ Next.js 16.3.5",
      "  - Local:        http://localhost:3000",
      "  - Environments: .env.local",
      "",
      " ✓ Ready in 1.2s",
    ],
    outputColor: "text-link-blue-soft",
  },
  {
    cmd: "ls -la",
    output: [
      "total 24",
      "drwxr-xr-x  app/",
      "drwxr-xr-x  components/",
      "-rw-r--r--  page.tsx",
      "-rw-r--r--  Header.tsx",
      "-rw-r--r--  Terminal.tsx",
      "-rw-r--r--  globals.css",
    ],
    outputColor: "text-ash",
  },
  {
    cmd: 'curl -s localhost:3000/api/health | jq "."',
    output: [
      "{",
      '  "status": "healthy",',
      '  "version": "1.0.0",',
      '  "uptime": "3h 42m",',
      '  "services": {',
      '    "database": "connected",',
      '    "cache": "connected"',
      "  }",
      "}",
    ],
    outputColor: "text-brand",
  },
  {
    cmd: 'echo "Ready to build amazing things!"',
    output: ["Ready to build amazing things!"],
    outputColor: "text-link-blue-soft",
  },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentTime, setCurrentTime] = useState("--:--:--");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(getTimeString());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const wait = (ms: number): Promise<void> =>
      new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, ms);
      });

    const typeCommand = (cmd: string): Promise<void> => {
      return new Promise((resolve) => {
        let charIndex = 0;

        const typeNextChar = () => {
          if (isCancelled) return;
          if (charIndex < cmd.length) {
            setCurrentTyping(cmd.slice(0, charIndex + 1));
            charIndex++;
            const delay = TYPING_SPEED_MIN + Math.random() * (TYPING_SPEED_MAX - TYPING_SPEED_MIN);
            timeoutRef.current = setTimeout(typeNextChar, delay);
          } else {
            timeoutRef.current = setTimeout(resolve, PAUSE_AFTER_TYPING);
          }
        };

        typeNextChar();
      });
    };

    const showOutput = (output: string[], color: string | undefined): void => {
      const outputLines: Line[] = output.map((text) => ({
        type: "output",
        text,
        color,
      }));
      setLines((prev) => [...prev, ...outputLines]);
    };

    const runCommand = async (commandIndex: number) => {
      if (isCancelled) return;

      const command = COMMANDS[commandIndex];

      // Phase 1: Show prompt
      setShowPrompt(true);
      setCurrentTyping("");
      await wait(PAUSE_BEFORE_PROMPT);

      if (isCancelled) return;

      // Phase 2: Type command
      setShowPrompt(false);
      await typeCommand(command.cmd);

      if (isCancelled) return;

      // Phase 3: Command finalized (Enter press) - brief pause without cursor
      setCurrentTyping("");
      await wait(200);

      if (isCancelled) return;

      // Phase 4: Add command to history and show output
      setLines((prev) => [
        ...prev,
        { type: "input", text: command.cmd },
      ]);
      showOutput(command.output, command.outputColor);
      await wait(PAUSE_AFTER_OUTPUT);

      if (isCancelled) return;

      // Phase 5: Next command or loop
      const nextIndex = commandIndex + 1;
      if (nextIndex < COMMANDS.length) {
        runCommand(nextIndex);
      } else {
        await wait(LOOP_DELAY);
        if (isCancelled) return;
        setLines([]);
        setCurrentTyping("");
        setShowPrompt(false);
        await wait(500);
        if (!isCancelled) runCommand(0);
      }
    };

    timeoutRef.current = setTimeout(() => {
      if (!isCancelled) runCommand(0);
    }, 500);

    return () => {
      isCancelled = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentTyping, showPrompt]);

  const visibleLines = lines.slice(-MAX_VISIBLE_LINES);

  return (
    <div className="rounded-app-lg border border-hairline-soft bg-canvas-soft overflow-hidden w-full max-w-full sm:max-w-[500px]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-hairline-soft px-3 sm:px-4 py-2">
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500"></span>
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500"></span>
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500"></span>
        <span className="ml-3 sm:ml-4 type-mono-micro text-mute">terminal</span>
        <span className="ml-auto type-mono-micro text-mute">{currentTime}</span>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="font-mono text-[10px] sm:text-xs p-2 sm:p-3 h-[240px] sm:h-[280px] overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {visibleLines.map((line, i) => (
          <div key={i} className={`${line.type === "input" ? "text-ash" : line.color || "text-ash"} whitespace-nowrap overflow-hidden text-ellipsis`}>
            {line.type === "input" ? (
              <span>
                <span className="text-link-blue-soft">$</span> {line.text}
              </span>
            ) : (
              <span className="opacity-90">{line.text}</span>
            )}
          </div>
        ))}

        {/* Prompt with typing */}
        {showPrompt && (
          <div className="text-ash whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-link-blue-soft">$</span>{" "}
            <span className="cursor-blink text-link-blue-soft">_</span>
          </div>
        )}

        {/* Current typing line */}
        {currentTyping && (
          <div className="text-ash whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-link-blue-soft">$</span>{" "}
            <span className="text-on-primary">{currentTyping}</span>
            <span className="cursor-blink text-link-blue-soft">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
