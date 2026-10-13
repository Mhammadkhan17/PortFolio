"use client"

import { useFrame, type ThreeEvent } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useLayoutEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"
import { useMediaQuery } from "@/lib/hooks"

type Skill = {
  name: string
  category: "frontend" | "backend" | "ai" | "tools"
  ring: number
  angle: number
  speed: number
  radius: number
}

const SKILLS: Skill[] = [
  { name: "React", category: "frontend", ring: 0, angle: 0, speed: 0.3, radius: 2.2 },
  { name: "Next.js", category: "frontend", ring: 0, angle: 0.8, speed: 0.3, radius: 2.2 },
  { name: "TypeScript", category: "frontend", ring: 0, angle: 1.6, speed: 0.3, radius: 2.2 },
  { name: "Tailwind CSS", category: "frontend", ring: 0, angle: 2.4, speed: 0.3, radius: 2.2 },
  { name: "Vue 3", category: "frontend", ring: 0, angle: 3.2, speed: 0.3, radius: 2.2 },
  { name: "Three.js", category: "frontend", ring: 0, angle: 4.0, speed: 0.3, radius: 2.2 },
  { name: "Framer Motion", category: "frontend", ring: 0, angle: 4.8, speed: 0.3, radius: 2.2 },
  { name: "Node.js", category: "backend", ring: 1, angle: 0, speed: 0.2, radius: 3.0 },
  { name: "FastAPI", category: "backend", ring: 1, angle: 1.0, speed: 0.2, radius: 3.0 },
  { name: "PostgreSQL", category: "backend", ring: 1, angle: 2.0, speed: 0.2, radius: 3.0 },
  { name: "Supabase", category: "backend", ring: 1, angle: 3.0, speed: 0.2, radius: 3.0 },
  { name: "Socket.IO", category: "backend", ring: 1, angle: 4.0, speed: 0.2, radius: 3.0 },
  { name: "Redis", category: "backend", ring: 1, angle: 5.0, speed: 0.2, radius: 3.0 },
  { name: "Python", category: "ai", ring: 2, angle: 0, speed: 0.15, radius: 3.8 },
  { name: "Qdrant", category: "ai", ring: 2, angle: 1.2, speed: 0.15, radius: 3.8 },
  { name: "ONNX", category: "ai", ring: 2, angle: 2.4, speed: 0.15, radius: 3.8 },
  { name: "RAG", category: "ai", ring: 2, angle: 3.6, speed: 0.15, radius: 3.8 },
  { name: "MCP", category: "ai", ring: 2, angle: 4.8, speed: 0.15, radius: 3.8 },
  { name: "Git", category: "tools", ring: 0, angle: 5.6, speed: 0.3, radius: 2.2 },
  { name: "Docker", category: "tools", ring: 1, angle: 5.8, speed: 0.2, radius: 3.0 },
  { name: "Vercel", category: "tools", ring: 1, angle: 0.5, speed: 0.2, radius: 3.0 },
  { name: "Linux", category: "tools", ring: 2, angle: 0.6, speed: 0.15, radius: 3.8 },
]

const CATEGORY_COLORS: Record<Skill["category"], string> = {
  frontend: "#00C2B2",
  backend: "#6B9FFF",
  ai: "#F59E0B",
  tools: "#A8A6A1",
}

export function SkillConstellation() {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const isMobile = useMediaQuery("(max-width: 767px)")

  const visibleSkills = useMemo(
    () => (isMobile ? SKILLS.filter((_, i) => i % 2 === 0) : SKILLS),
    [isMobile]
  )

  useLayoutEffect(() => {
    if (!meshRef.current) return
    const color = new THREE.Color()
    visibleSkills.forEach((skill, i) => {
      color.set(CATEGORY_COLORS[skill.category])
      meshRef.current!.setColorAt(i, color)
    })
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [visibleSkills])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    const t = state.clock.elapsedTime
    const isAbout = scrollState.section === "about"

    groupRef.current.rotation.y = t * 0.05

    const targetScale = isAbout ? 1 : 0
    const currentScale = groupRef.current.scale.x
    const newScale = currentScale + (targetScale - currentScale) * 0.05
    groupRef.current.scale.setScalar(newScale)

    visibleSkills.forEach((skill, i) => {
      const angle = skill.angle + t * skill.speed
      const x = Math.cos(angle) * skill.radius
      const z = Math.sin(angle) * skill.radius
      const y = Math.sin(angle * 2 + i) * 0.3

      dummy.position.set(x, y, z)

      const targetSize = hovered === i ? 1.5 : 1
      const currentSize = dummy.scale.x
      dummy.scale.setScalar(currentSize + (targetSize - currentSize) * 0.15)

      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true

    if (hovered !== null && visibleSkills[hovered]) {
      const skill = visibleSkills[hovered]
      const angle = skill.angle + t * skill.speed
      const x = Math.cos(angle) * skill.radius
      const y = Math.sin(angle * 2 + hovered) * 0.3
      const z = Math.sin(angle) * skill.radius

      const vector = new THREE.Vector3(x, y, z)
      vector.applyMatrix4(groupRef.current.matrixWorld)
      vector.project(state.camera)

      const screenX = (vector.x * 0.5 + 0.5) * state.size.width
      const screenY = (-vector.y * 0.5 + 0.5) * state.size.height

      setTooltipPos({ x: screenX, y: screenY })
    } else {
      setTooltipPos(null)
    }
  })

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId !== undefined) {
      setHovered(e.instanceId)
    }
  }

  const onPointerOut = () => {
    setHovered(null)
    setTooltipPos(null)
  }

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, visibleSkills.length]}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
      >
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </instancedMesh>
      {hovered !== null && visibleSkills[hovered] && tooltipPos && (
        <Html
          position={[0, 0, 0]}
          style={{
            position: "fixed",
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          <div className="rounded bg-void/90 px-2 py-1 text-xs text-mist whitespace-nowrap">
            {visibleSkills[hovered].name}
          </div>
        </Html>
      )}
    </group>
  )
}
