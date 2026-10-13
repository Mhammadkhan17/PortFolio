"use client"

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"

import { useMediaQuery, usePerformanceTier } from "@/lib/hooks"

export function Effects() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const perfTier = usePerformanceTier()
  const enabled = isDesktop && perfTier !== "low"

  if (!enabled) return null

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={perfTier === "high" ? 0.7 : 0.8}
        intensity={perfTier === "high" ? 0.6 : 0.4}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.5} />
    </EffectComposer>
  )
}
