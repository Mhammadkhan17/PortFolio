"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { StaticGradient } from "./StaticGradient"

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
  loading: () => <StaticGradient />,
})

function canRenderScene(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

export function SceneWrapper() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      if (canRenderScene()) {
        setMounted(true)
        raf2 = requestAnimationFrame(() => setVisible(true))
      }
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
        style={{ opacity: visible ? 0 : 1 }}
      >
        <StaticGradient />
      </div>
      {mounted && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <SceneCanvas />
        </div>
      )}
    </>
  )
}
