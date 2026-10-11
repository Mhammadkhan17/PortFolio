"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

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
  { name: "FastAPI", category: "ai", ring: 2, angle: 1.2, speed: 0.15, radius: 3.8 },
  { name: "Qdrant", category: "ai", ring: 2, angle: 2.4, speed: 0.15, radius: 3.8 },
  { name: "ONNX", category: "ai", ring: 2, angle: 3.6, speed: 0.15, radius: 3.8 },
  { name: "RAG", category: "ai", ring: 2, angle: 4.8, speed: 0.15, radius: 3.8 },
  { name: "MCP", category: "ai", ring: 2, angle: 5.6, speed: 0.15, radius: 3.8 },
  { name: "Git", category: "tools", ring: 0, angle: 5.6, speed: 0.3, radius: 2.2 },
  { name: "Docker", category: "tools", ring: 1, angle: 5.8, speed: 0.2, radius: 3.0 },
  { name: "Vercel", category: "tools", ring: 1, angle: 0.5, speed: 0.2, radius: 3.0 },
  { name: "Linux", category: "tools", ring: 2, angle: 0.6, speed: 0.15, radius: 3.8 },
]

const CATEGORY_COLORS: Record<Skill["category"], THREE.Color> = {
  frontend: new THREE.Color("#00C2B2"),
  backend: new THREE.Color("#6B9FFF"),
  ai: new THREE.Color("#F59E0B"),
  tools: new THREE.Color("#A8A6A1"),
}

export function SkillConstellation() {
  const groupRef = useRef<THREE.Group>(null)
  const meshRefs = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  const visibleSkills = useMemo(
    () => (isMobile ? SKILLS.filter((_, i) => i % 2 === 0) : SKILLS),
    [isMobile]
  )

  const colorArray = useMemo(() => {
    const arr = new Float32Array(visibleSkills.length * 3)
    visibleSkills.forEach((s, i) => {
      const c = CATEGORY_COLORS[s.category]
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    })
    return arr
  }, [visibleSkills])

  useFrame((state) => {
    if (!meshRefs.current || !groupRef.current) return

    const t = state.clock.elapsedTime
    const isAbout = scrollState.section === "about"

    groupRef.current.rotation.y = t * 0.05
    groupRef.current.scale.lerp(
      new THREE.Vector3(isAbout ? 1 : 0, isAbout ? 1 : 0, isAbout ? 1 : 0),
      0.05
    )

    visibleSkills.forEach((skill, i) => {
      const angle = skill.angle + t * skill.speed
      const x = Math.cos(angle) * skill.radius
      const z = Math.sin(angle) * skill.radius
      const y = Math.sin(angle * 2 + i) * 0.3

      dummy.position.set(x, y, z)
      dummy.scale.setScalar(isAbout ? 1 : 0)
      dummy.updateMatrix()
      meshRefs.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRefs.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRefs} args={[undefined, undefined, visibleSkills.length]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          emissiveIntensity={0.5}
          toneMapped={false}
        />
        <instancedBufferAttribute
          attach="geometry-color"
          args={[colorArray, 3]}
          count={visibleSkills.length}
          itemSize={3}
        />
      </instancedMesh>
    </group>
  )
}
