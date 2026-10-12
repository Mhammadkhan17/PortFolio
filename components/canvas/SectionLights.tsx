"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const DARK_BG = new THREE.Color("#0A0A0F")
const LIGHT_BG = new THREE.Color("#F5F3EF")

const LIGHT_SECTIONS = new Set(["process", "pricing"])

export function SectionLights() {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const directionalRef = useRef<THREE.DirectionalLight>(null)
  const currentBg = useRef(new THREE.Color("#0A0A0F"))
  const { scene } = useThree()

  useFrame((_, delta) => {
    const isLight = LIGHT_SECTIONS.has(scrollState.section)
    const targetBg = isLight ? LIGHT_BG : DARK_BG
    currentBg.current.lerp(targetBg, delta * 2)

    const fog = scene.fog as THREE.Fog | null
    if (fog) {
      fog.color.lerp(targetBg, delta * 2)
    }

    if (directionalRef.current) {
      const targetIntensity = isLight ? 1.2 : 0.6
      directionalRef.current.intensity += (targetIntensity - directionalRef.current.intensity) * delta * 2
    }

    if (ambientRef.current) {
      const targetIntensity = isLight ? 0.8 : 0.3
      ambientRef.current.intensity += (targetIntensity - ambientRef.current.intensity) * delta * 2
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.3} color="#E8E6E1" />
      <directionalLight ref={directionalRef} intensity={0.6} position={[5, 5, 5]} color="#E8E6E1" />
      <directionalLight intensity={0.2} position={[-5, -3, 2]} color="#00C2B2" />
    </>
  )
}
