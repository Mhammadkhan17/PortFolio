"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition() {
  const pathname = usePathname()
  const [displayPath, setDisplayPath] = useState(pathname)
  const [transitionStage, setTransitionStage] = useState<"enter" | "exit" | "idle">("idle")

  useEffect(() => {
    if (pathname !== displayPath) {
      const raf = requestAnimationFrame(() => setTransitionStage("exit"))
      const timer = setTimeout(() => {
        setDisplayPath(pathname)
        setTransitionStage("enter")
        setTimeout(() => setTransitionStage("idle"), 500)
      }, 300)
      return () => {
        cancelAnimationFrame(raf)
        clearTimeout(timer)
      }
    }
  }, [pathname, displayPath])

  if (transitionStage === "idle") return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] bg-void"
      style={{
        animation: transitionStage === "exit"
          ? "pageExit 0.3s ease-in forwards"
          : "pageEnter 0.5s ease-out forwards",
      }}
    />
  )
}
