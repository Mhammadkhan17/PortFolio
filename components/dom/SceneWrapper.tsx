"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { StaticGradient } from "./StaticGradient"

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
  loading: () => <StaticGradient />,
})

function canRenderScene(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

export function SceneWrapper() {
  const [showScene] = useState(() => {
    if (typeof window === "undefined") return false
    return canRenderScene()
  })

  if (!showScene) {
    return <StaticGradient />
  }

  return <SceneCanvas />
}
