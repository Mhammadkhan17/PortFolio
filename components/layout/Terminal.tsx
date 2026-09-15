"use client";

import { useState, useEffect, useRef } from "react";

const TYPING_SPEED_MIN = 50;
const TYPING_SPEED_MAX = 80;
const PAUSE_AFTER_COMMAND = 300;
const PAUSE_BETWEEN_COMMANDS = 800;
const LOOP_DELAY = 2000;
const MAX_VISIBLE_LINES = 10;

type Line = {
  type: "input" | "output";
  text: string;
  color?: string;
};

function getFileDate(): string {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" });
  const day = now.getDate();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${month} ${day} ${time}`;
}

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
    outputColor: "text-green-400",
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
    outputColor: "text-cyan",
  },
  {
    cmd: "ls -la",
    outputFn: () => {
      const fileDate = getFileDate();
      return [
        `drwxr-xr-x  8 user  staff   256 ${fileDate} .`,
        `drwxr-xr-x  5 user  staff   160 ${fileDate} ..`,
        `-rw-r--r--  1 user  staff  1024 ${fileDate} page.tsx`,
        `-rw-r--r--  1 user  staff   512 ${fileDate} Header.tsx`,
        `-rw-r--r--  1 user  staff   768 ${fileDate} Terminal.tsx`,
        `-rw-r--r--  1 user  staff  2048 ${fileDate} globals.css`,
      ];
    },
    outputColor: "text-light-grey",
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
    outputColor: "text-yellow-400",
  },
  {
    cmd: 'echo "Ready to build amazing things!"',
    output: ["Ready to build amazing things!"],
    outputColor: "text-cyan",
  },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [isTypingCommand, setIsTypingCommand] = useState(false);
  const [currentTime, setCurrentTime] = useState("--:--:--");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Time updates
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

    const typeCommand = (cmd: string): Promise<void> => {
      return new Promise((resolve) => {
        setIsTypingCommand(true);
        let charIndex = 0;

        const typeNextChar = () => {
          if (isCancelled) return;
          if (charIndex < cmd.length) {
            setCurrentTyping(cmd.slice(0, charIndex + 1));
            charIndex++;
            const delay = TYPING_SPEED_MIN + Math.random() * (TYPING_SPEED_MAX - TYPING_SPEED_MIN);
            timeoutRef.current = setTimeout(typeNextChar, delay);
          } else {
            setIsTypingCommand(false);
            timeoutRef.current = setTimeout(resolve, PAUSE_AFTER_COMMAND);
          }
        };

        typeNextChar();
      });
    };

    const showOutput = (output: string[], color: string | undefined): Promise<void> => {
      return new Promise((resolve) => {
        const outputLines: Line[] = output.map((text) => ({
          type: "output",
          text,
          color,
        }));

        setLines((prev) => [...prev, ...outputLines]);
        timeoutRef.current = setTimeout(resolve, PAUSE_BETWEEN_COMMANDS);
      });
    };

    const runCommand = async (commandIndex: number) => {
      if (isCancelled) return;

      const command = COMMANDS[commandIndex];
      const output = command.outputFn ? command.outputFn() : command.output;

      setLines((prev) => [
        ...prev,
        { type: "input", text: `$ ${command.cmd}` },
      ]);
      setCurrentTyping("");

      await typeCommand(command.cmd);

      if (isCancelled) return;

      setCurrentTyping("");
      await showOutput(output, command.outputColor);

      if (isCancelled) return;

      const nextIndex = commandIndex + 1;
      if (nextIndex < COMMANDS.length) {
        timeoutRef.current = setTimeout(() => {
          if (!isCancelled) runCommand(nextIndex);
        }, 100);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (isCancelled) return;
          setLines([]);
          setCurrentTyping("");
          timeoutRef.current = setTimeout(() => {
            if (!isCancelled) runCommand(0);
          }, 500);
        }, LOOP_DELAY);
      }
    };

    timeoutRef.current = setTimeout(() => {
      if (!isCancelled) runCommand(0);
    }, 1000);

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
  }, [lines, currentTyping]);

  const visibleLines = lines.slice(-MAX_VISIBLE_LINES);

  return (
    <div className="rounded-lg border border-border bg-dark-bg overflow-hidden w-full max-w-[500px]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-red-500"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
        <span className="h-3 w-3 rounded-full bg-green-500"></span>
        <span className="ml-4 text-xs text-grey">terminal</span>
        <span className="ml-auto text-xs text-grey">{currentTime}</span>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="font-mono text-xs p-3 h-[280px] overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {visibleLines.map((line, i) => (
          <div key={i} className={`${line.type === "input" ? "text-grey" : line.color || "text-light-grey"} whitespace-nowrap overflow-hidden text-ellipsis`}>
            {line.type === "input" ? (
              <span>
                <span className="text-cyan">$</span> {line.text.slice(2)}
              </span>
            ) : (
              <span className="opacity-90">{line.text}</span>
            )}
          </div>
        ))}

        {/* Current typing line */}
        {(isTypingCommand || currentTyping) && (
          <div className="text-grey whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-cyan">$</span>{" "}
            <span className="text-white">{currentTyping}</span>
            <span className="cursor-blink text-cyan">_</span>
          </div>
        )}

        {/* Idle cursor when not typing */}
        {!isTypingCommand && !currentTyping && lines.length === 0 && (
          <div className="text-grey">
            <span className="text-cyan">$</span>{" "}
            <span className="cursor-blink text-cyan">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
