"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const COUNT = 2000

function generateSectionPositions(): Float32Array[] {
  const positions: Float32Array[] = []

  // Hero: dense diagonal wave sweep
  const hero = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT
    hero[i * 3] = (Math.random() - 0.5) * 12 + t * 4 - 2
    hero[i * 3 + 1] = (Math.random() - 0.5) * 8 + Math.sin(t * Math.PI * 4) * 1.5
    hero[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
  }
  positions.push(hero)

  // Case Studies: discrete clumps
  const cases = new Float32Array(COUNT * 3)
  const clumps = [
    { x: 2, y: 1, z: 0 },
    { x: -1, y: -1, z: 1 },
    { x: 3, y: -0.5, z: -1 },
    { x: 0, y: 2, z: 0.5 },
    { x: 1, y: -2, z: 0 },
  ]
  for (let i = 0; i < COUNT; i++) {
    const clump = clumps[i % clumps.length]
    cases[i * 3] = clump.x + (Math.random() - 0.5) * 2
    cases[i * 3 + 1] = clump.y + (Math.random() - 0.5) * 2
    cases[i * 3 + 2] = clump.z + (Math.random() - 0.5) * 2
  }
  positions.push(cases)

  // Process: thin horizontal strata
  const process = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const band = Math.floor(Math.random() * 5)
    process[i * 3] = (Math.random() - 0.5) * 14
    process[i * 3 + 1] = (band - 2) * 1.2 + (Math.random() - 0.5) * 0.3
    process[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
  }
  positions.push(process)

  // Pricing: sparse distant dots
  const pricing = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    pricing[i * 3] = (Math.random() - 0.5) * 20
    pricing[i * 3 + 1] = (Math.random() - 0.5) * 14
    pricing[i * 3 + 2] = -5 - Math.random() * 5
  }
  positions.push(pricing)

  // CTA: converging spiral toward anchor
  const cta = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT
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

const SEEDS = Float32Array.from({ length: COUNT }, (_, i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
})

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { geometry, sectionPositions } = useMemo(() => {
    const positions = generateSectionPositions()
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions[0].slice(), 3))

    const data = new Float32Array(positions.length * COUNT * 3)
    for (let s = 0; s < positions.length; s++) {
      data.set(positions[s], s * COUNT * 3)
    }
    const dataTexture = new THREE.DataTexture(
      data,
      COUNT,
      positions.length,
      THREE.RGBFormat,
      THREE.FloatType
    )
    dataTexture.needsUpdate = true

    return { geometry: geo, sectionPositions: { dataTexture, count: positions.length } }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uSectionIndex: { value: 0 },
      uNextSectionIndex: { value: 1 },
      uSectionData: { value: sectionPositions.dataTexture },
      uColor: { value: new THREE.Color("#00C2B2") },
      uPixelRatio: { value: 1 },
    }),
    [sectionPositions]
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

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
    }
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

          attribute float aSeed;

          varying float vAlpha;

          vec3 getSectionPos(float section, float idx) {
            float x = (idx + 0.5) / 5.0;
            vec2 uv = vec2(x, (aSeed + 0.5));
            return texture2D(uSectionData, uv).rgb;
          }

          void main() {
            vec3 posA = getSectionPos(uSectionIndex, uSectionIndex);
            vec3 posB = getSectionPos(uNextSectionIndex, uNextSectionIndex);
            vec3 pos = mix(posA, posB, uMorph);

            float drift = sin(uTime * 0.5 + aSeed * 6.28) * 0.15;
            pos.y += drift;
            pos.x += cos(uTime * 0.3 + aSeed * 6.28) * 0.1;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float size = mix(2.0, 6.0, aSeed) * uPixelRatio;
            gl_PointSize = size * (1.0 / -mvPosition.z);

            vAlpha = mix(0.3, 0.8, aSeed);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;

          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
      <bufferAttribute attach="attributes-aSeed" args={[SEEDS, 1]} />
    </points>
  )
}
