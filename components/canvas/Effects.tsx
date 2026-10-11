"use client"

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useState } from "react"

function checkDesktop(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth >= 768
}

export function Effects() {
  const [isDesktop] = useState(() => checkDesktop())

  if (!isDesktop) return null

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.7}
        intensity={0.6}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.5} />
    </EffectComposer>
  )
}
