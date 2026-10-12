"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Lightformer } from "@react-three/drei"
import { Component, Suspense, useEffect, useState, type ReactNode } from "react"
import { CameraRig } from "./CameraRig"
import { AnchorGeometry } from "./AnchorGeometry"
import { ParticleField } from "./ParticleField"
import { SectionLights } from "./SectionLights"
import { Effects } from "./Effects"


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  )
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isMobile
}

function usePageVisible() {
  const [visible, setVisible] = useState(() => document.visibilityState === "visible")
  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])
  return visible
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function SceneContent() {
  const isMobile = useIsMobile()
  const pageVisible = usePageVisible()

  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      frameloop={pageVisible ? "always" : "never"}
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
      }}
    >
      <color attach="background" args={["#0A0A0F"]} />
      <fog attach="fog" args={["#0A0A0F", 8, 20]} />
      <Suspense fallback={null}>
        <SectionLights />
        <AnchorGeometry />
        <ParticleField />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 0, -5]} scale={[10, 10, 1]} color="#00C2B2" />
          <Lightformer intensity={1.5} position={[4, 3, 2]} scale={[6, 6, 1]} color="#00C2B2" />
          <Lightformer intensity={1} position={[-3, -2, 3]} scale={[4, 4, 1]} color="#F5F3EF" />
        </Environment>
        <Effects />
        <CameraRig />
      </Suspense>
    </Canvas>
  )
}

export default function SceneCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <CanvasErrorBoundary fallback={null}>
        <SceneContent />
      </CanvasErrorBoundary>
    </div>
  )
}
