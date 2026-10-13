"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const AMBIENT_SHAPES = [
  { position: [3, 2, -3] as const, scale: 0.8, section: "hero" },
  { position: [-3, -2, -2] as const, scale: 0.6, section: "hero" },
  { position: [-2, 1, -4] as const, scale: 0.5, section: "case-studies" },
  { position: [3, -1, -3] as const, scale: 0.7, section: "case-studies" },
  { position: [-3, 0, -5] as const, scale: 0.4, section: "process" },
  { position: [2, 2, -4] as const, scale: 0.6, section: "pricing" },
  { position: [-2, -1, -3] as const, scale: 0.5, section: "cta" },
  { position: [3, 1, -2] as const, scale: 0.7, section: "about" },
]

export function AmbientGeometry() {
  const groupRef = useRef<THREE.Group>(null)

  const meshes = useMemo(() => {
    return AMBIENT_SHAPES.map((shape, i) => {
      const geometry = i % 2 === 0
        ? new THREE.IcosahedronGeometry(0.3, 0)
        : new THREE.OctahedronGeometry(0.25, 0)
      return { geometry, ...shape }
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = t * 0.1
      child.rotation.y = t * 0.15

      const shape = AMBIENT_SHAPES[i]
      const targetOpacity = scrollState.section === shape.section ? 0.3 : 0
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
      mat.opacity += (targetOpacity - mat.opacity) * 0.05
    })
  })

  return (
    <group ref={groupRef}>
      {meshes.map((mesh, i) => (
        <mesh
          key={i}
          geometry={mesh.geometry}
          position={[mesh.position[0], mesh.position[1], mesh.position[2]]}
          scale={mesh.scale}
        >
          <meshStandardMaterial
            color="#E8E6E1"
            transparent
            opacity={0}
            metalness={0.5}
            roughness={0.5}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}
