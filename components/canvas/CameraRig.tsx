"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const CAMERA_TARGETS: Record<string, { pos: THREE.Vector3; look: THREE.Vector3 }> = {
  hero: { pos: new THREE.Vector3(0, 0, 6), look: new THREE.Vector3(0, 0, 0) },
  "case-studies": { pos: new THREE.Vector3(1.5, 0.3, 5.5), look: new THREE.Vector3(0.5, 0, 0) },
  process: { pos: new THREE.Vector3(0, 0.5, 8), look: new THREE.Vector3(0, 0, 0) },
  pricing: { pos: new THREE.Vector3(0, 0.2, 10), look: new THREE.Vector3(0, 0, 0) },
  cta: { pos: new THREE.Vector3(0, 0, 5), look: new THREE.Vector3(0, 0, 0) },
  about: { pos: new THREE.Vector3(2, 0.5, 5), look: new THREE.Vector3(0, 0, 0) },
}

export function CameraRig() {
  const { camera, size } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 0, 6))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))
  const currentLook = useRef(new THREE.Vector3(0, 0, 0))
  const desiredPos = useRef(new THREE.Vector3(0, 0, 6))

  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.1)
    const section = scrollState.section
    const targets = CAMERA_TARGETS[section] ?? CAMERA_TARGETS.hero

    const aspect = size.width / size.height
    const isPortrait = aspect < 1
    const distMultiplier = isPortrait ? 1.3 : 1

    const lerpSpeed = 3.5 * clampedDelta
    targetPos.current.lerp(targets.pos, lerpSpeed)
    targetLook.current.lerp(targets.look, lerpSpeed)

    const px = scrollState.pointer.x * 0.3
    const py = scrollState.pointer.y * 0.2

    desiredPos.current.set(
      targetPos.current.x + px,
      targetPos.current.y + py,
      targetPos.current.z * distMultiplier
    )

    camera.position.lerp(desiredPos.current, lerpSpeed)
    currentLook.current.lerp(targetLook.current, lerpSpeed)
    camera.lookAt(currentLook.current)
  })

  return null
}
