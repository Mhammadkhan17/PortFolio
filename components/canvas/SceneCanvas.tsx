"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Suspense } from "react"
import { CameraRig } from "./CameraRig"
import { AnchorGeometry } from "./AnchorGeometry"
import { ParticleField } from "./ParticleField"
import { SectionLights } from "./SectionLights"
import { Effects } from "./Effects"

export default function SceneCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
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
            <mesh scale={[10, 10, 1]} position={[0, 0, -5]}>
              <planeGeometry />
              <meshBasicMaterial color="#00C2B2" transparent opacity={0.03} />
            </mesh>
            <mesh scale={[6, 6, 1]} position={[4, 3, 2]}>
              <planeGeometry />
              <meshBasicMaterial color="#00C2B2" transparent opacity={0.06} />
            </mesh>
            <mesh scale={[4, 4, 1]} position={[-3, -2, 3]}>
              <planeGeometry />
              <meshBasicMaterial color="#F5F3EF" transparent opacity={0.04} />
            </mesh>
          </Environment>
          <Effects />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
