"use client"

import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const DESKTOP_COUNT = 2000
const MOBILE_COUNT = 800

function generateSectionPositions(count: number): Float32Array[] {
  const positions: Float32Array[] = []

  const hero = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = i / count
    hero[i * 3] = (Math.random() - 0.5) * 12 + t * 4 - 2
    hero[i * 3 + 1] = (Math.random() - 0.5) * 8 + Math.sin(t * Math.PI * 4) * 1.5
    hero[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
  }
  positions.push(hero)

  const cases = new Float32Array(count * 3)
  const clumps = [
    { x: 2, y: 1, z: 0 },
    { x: -1, y: -1, z: 1 },
    { x: 3, y: -0.5, z: -1 },
    { x: 0, y: 2, z: 0.5 },
    { x: 1, y: -2, z: 0 },
  ]
  for (let i = 0; i < count; i++) {
    const clump = clumps[i % clumps.length]
    cases[i * 3] = clump.x + (Math.random() - 0.5) * 2
    cases[i * 3 + 1] = clump.y + (Math.random() - 0.5) * 2
    cases[i * 3 + 2] = clump.z + (Math.random() - 0.5) * 2
  }
  positions.push(cases)

  const process = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const band = Math.floor(Math.random() * 5)
    process[i * 3] = (Math.random() - 0.5) * 14
    process[i * 3 + 1] = (band - 2) * 1.2 + (Math.random() - 0.5) * 0.3
    process[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
  }
  positions.push(process)

  const pricing = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pricing[i * 3] = (Math.random() - 0.5) * 20
    pricing[i * 3 + 1] = (Math.random() - 0.5) * 14
    pricing[i * 3 + 2] = -5 - Math.random() * 5
  }
  positions.push(pricing)

  const cta = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = i / count
    const angle = t * Math.PI * 8
    const radius = 0.5 + t * 4
    cta[i * 3] = Math.cos(angle) * radius
    cta[i * 3 + 1] = Math.sin(angle) * radius * 0.6
    cta[i * 3 + 2] = Math.sin(t * Math.PI * 2) * 1.5
  }
  positions.push(cta)

  return positions
}

const SECTION_ORDER = ["hero", "case-studies", "process", "pricing", "cta"]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  )
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isMobile
}

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const isMobile = useIsMobile()
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT

  const { geometry, dataTexture, sectionCount } = useMemo(() => {
    const positions = generateSectionPositions(count)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions[0].slice(), 3))

    const indices = new Float32Array(count)
    for (let i = 0; i < count; i++) indices[i] = i
    geo.setAttribute("aIndex", new THREE.BufferAttribute(indices, 1))

    const data = new Float32Array(positions.length * count * 3)
    for (let s = 0; s < positions.length; s++) {
      data.set(positions[s], s * count * 3)
    }
    const tex = new THREE.DataTexture(
      data,
      count,
      positions.length,
      THREE.RGBAFormat,
      THREE.FloatType
    )
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.needsUpdate = true

    return { geometry: geo, dataTexture: tex, sectionCount: positions.length }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uSectionIndex: { value: 0 },
      uNextSectionIndex: { value: 1 },
      uSectionData: { value: dataTexture },
      uColor: { value: new THREE.Color("#00C2B2") },
      uPixelRatio: { value: 1 },
      uCount: { value: count },
      uSectionCount: { value: sectionCount },
    }),
    [dataTexture, count, sectionCount]
  )

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return

    const u = materialRef.current.uniforms
    u.uTime.value += delta
    u.uPixelRatio.value = state.gl.getPixelRatio()

    const currentSection = scrollState.section
    const currentIdx = Math.max(0, SECTION_ORDER.indexOf(currentSection))
    const nextIdx = Math.min(SECTION_ORDER.length - 1, currentIdx + 1)

    u.uSectionIndex.value = currentIdx
    u.uNextSectionIndex.value = nextIdx
    u.uMorph.value = scrollState.sectionProgress

    pointsRef.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform float uTime;
          uniform float uMorph;
          uniform float uSectionIndex;
          uniform float uNextSectionIndex;
          uniform sampler2D uSectionData;
          uniform float uPixelRatio;
          uniform float uCount;
          uniform float uSectionCount;

          attribute float aIndex;

          varying float vAlpha;
          varying float vSeed;

          vec3 sampleSection(float sectionIdx, float particleIdx) {
            float x = (particleIdx + 0.5) / uCount;
            float y = (sectionIdx + 0.5) / uSectionCount;
            return texture2D(uSectionData, vec2(x, y)).rgb;
          }

          void main() {
            float seed = fract(aIndex * 0.6180339887);
            vSeed = seed;

            vec3 posA = sampleSection(uSectionIndex, aIndex);
            vec3 posB = sampleSection(uNextSectionIndex, aIndex);
            vec3 pos = mix(posA, posB, uMorph);

            float drift = sin(uTime * 0.5 + seed * 6.2831) * 0.15;
            pos.y += drift;
            pos.x += cos(uTime * 0.3 + seed * 6.2831) * 0.1;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float size = mix(2.0, 6.0, seed) * uPixelRatio;
            gl_PointSize = size * (1.0 / -mvPosition.z);

            vAlpha = mix(0.3, 0.8, seed);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          varying float vSeed;

          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  )
}
