"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const PROJECT_SHAPES = [
  { color: "#00C2B2", position: [2.5, 1, -1] as const },
  { color: "#6B9FFF", position: [-2, -1, 0] as const },
  { color: "#F59E0B", position: [1.5, -0.5, -1] as const },
  { color: "#00C2B2", position: [-1, 1.5, 0] as const },
  { color: "#A8A6A1", position: [2, -1.5, -0.5] as const },
]

export function PerProjectGeometry() {
  const groupRef = useRef<THREE.Group>(null)

  const meshes = useMemo(() => {
    return PROJECT_SHAPES.map((shape, i) => {
      let geometry: THREE.BufferGeometry
      switch (i % 5) {
        case 0:
          geometry = new THREE.IcosahedronGeometry(0.15, 0)
          break
        case 1:
          geometry = new THREE.OctahedronGeometry(0.15, 0)
          break
        case 2:
          geometry = new THREE.TetrahedronGeometry(0.15, 0)
          break
        case 3:
          geometry = new THREE.DodecahedronGeometry(0.15, 0)
          break
        default:
          geometry = new THREE.TorusGeometry(0.1, 0.04, 8, 16)
      }
      return { geometry, ...shape }
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const isCaseStudies = scrollState.section === "case-studies"

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = t * (0.3 + i * 0.1)
      child.rotation.y = t * (0.2 + i * 0.15)
      const scale = isCaseStudies ? 1 : 0
      child.scale.setScalar(child.scale.x + (scale - child.scale.x) * 0.05)
    })
  })

  return (
    <group ref={groupRef}>
      {meshes.map((mesh, i) => (
        <mesh
          key={i}
          geometry={mesh.geometry}
          position={[mesh.position[0], mesh.position[1], mesh.position[2]]}
        >
          <meshStandardMaterial
            color={mesh.color}
            emissive={mesh.color}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}
