"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei"
import { Component, Suspense, useState, type ReactNode } from "react"
import { CameraRig } from "./CameraRig"
import { AnchorGeometry } from "./AnchorGeometry"
import { ParticleField } from "./ParticleField"
import { SectionLights } from "./SectionLights"
import { Effects } from "./Effects"
import { SkillConstellation } from "./SkillConstellation"
import { PerProjectGeometry } from "./PerProjectGeometry"
import { AmbientGeometry } from "./AmbientGeometry"
import { useMediaQuery, usePageVisible, usePerformanceTier } from "@/lib/hooks"

function FrameInvalidator() {
  const { invalidate } = useThree()
  useFrame(() => invalidate())
  return null
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
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const isSmartwatch = useMediaQuery("(max-width: 280px)")
  const pageVisible = usePageVisible()
  const perfTier = usePerformanceTier()

  const [dpr, setDpr] = useState<number | [number, number]>(
    isMobile ? 1 : isTablet ? 1.5 : perfTier === "high" ? [1, 2] : [1, 1.75]
  )

  const cameraFov = isMobile ? 55 : isTablet ? 50 : 45
  const cameraZ = isMobile ? 7 : isTablet ? 6.5 : 6

  if (isSmartwatch) return null

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, cameraZ], fov: cameraFov }}
      frameloop={pageVisible ? "demand" : "never"}
      gl={{
        powerPreference: perfTier === "low" ? "low-power" : "high-performance",
        antialias: perfTier !== "low",
        alpha: true,
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault()
        })
      }}
    >
      <color attach="background" args={["#0A0A0F"]} />
      <fog attach="fog" args={["#0A0A0F", 8, 20]} />
      <PerformanceMonitor
        onIncline={() => setDpr(isMobile ? 1 : isTablet ? 1.5 : [1, 2])}
        onDecline={() => setDpr(1)}
      >
        <Suspense fallback={null}>
          <SectionLights />
          <AnchorGeometry />
          <ParticleField />
          <SkillConstellation />
          <PerProjectGeometry />
          <AmbientGeometry />
          <Environment resolution={perfTier === "low" ? 128 : 256}>
            <Lightformer intensity={2} position={[0, 0, -5]} scale={[10, 10, 1]} color="#00C2B2" />
            <Lightformer intensity={1.5} position={[4, 3, 2]} scale={[6, 6, 1]} color="#00C2B2" />
            <Lightformer intensity={1} position={[-3, -2, 3]} scale={[4, 4, 1]} color="#F5F3EF" />
          </Environment>
          <Effects />
          <CameraRig />
          <FrameInvalidator />
        </Suspense>
      </PerformanceMonitor>
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
