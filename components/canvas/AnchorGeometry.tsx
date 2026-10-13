"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const TEAL = new THREE.Color("#00C2B2")
const AMBER = new THREE.Color("#F59E0B")

export function AnchorGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const currentEmissive = useRef(new THREE.Color("#00C2B2"))

  const geometry = useMemo(() => {
    return new THREE.TorusKnotGeometry(1, 0.35, 220, 32)
  }, [])

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1)

    if (meshRef.current) {
      meshRef.current.rotation.y += clampedDelta * 0.1
      meshRef.current.rotation.x += clampedDelta * 0.03
    }

    if (materialRef.current) {
      const targetEmissive = scrollState.section === "cta" ? AMBER : TEAL
      const intensity = scrollState.section === "cta" ? 0.4 : 0.15
      currentEmissive.current.lerp(targetEmissive, clampedDelta * 3)
      materialRef.current.emissive.copy(currentEmissive.current)
      materialRef.current.emissiveIntensity += (intensity - materialRef.current.emissiveIntensity) * clampedDelta * 3
    }

    const mouse = scrollState.pointer
    if (meshRef.current) {
      meshRef.current.position.x += (mouse.x * 0.1 - meshRef.current.position.x) * clampedDelta * 2
      meshRef.current.position.y += (mouse.y * 0.1 - meshRef.current.position.y) * clampedDelta * 2
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.2}>
      <meshPhysicalMaterial
        ref={materialRef}
        color="#1A2A2A"
        metalness={0.85}
        roughness={0.15}
        emissive="#00C2B2"
        emissiveIntensity={0.15}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}
