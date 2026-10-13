"use client"

import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"
import { useMediaQuery, usePerformanceTier } from "@/lib/hooks"

const COUNTS = { low: 400, medium: 800, high: 2000 } as const
const TILE_WIDTH = 256

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

  const about = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = i / count
    const angle = t * Math.PI * 6
    const radius = 1.5 + t * 3
    about[i * 3] = Math.cos(angle) * radius
    about[i * 3 + 1] = Math.sin(angle) * radius * 0.5
    about[i * 3 + 2] = Math.sin(t * Math.PI * 3) * 1.0
  }
  positions.push(about)

  return positions
}

const SECTION_ORDER = ["hero", "case-studies", "process", "pricing", "cta", "about"]

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const isMobile = useMediaQuery("(max-width: 767px)")
  const perfTier = usePerformanceTier()
  const count = isMobile ? COUNTS.medium : COUNTS[perfTier]

  const { geometry, dataTexture, sectionCount } = useMemo(() => {
    const positions = generateSectionPositions(count)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions[0].slice(), 3))

    const indices = new Float32Array(count)
    for (let i = 0; i < count; i++) indices[i] = i
    geo.setAttribute("aIndex", new THREE.BufferAttribute(indices, 1))

    const tilesX = Math.ceil(count / TILE_WIDTH)
    const tilesY = positions.length
    const data = new Float32Array(tilesX * TILE_WIDTH * tilesY * 4)

    for (let s = 0; s < positions.length; s++) {
      for (let i = 0; i < count; i++) {
        const tileIdx = Math.floor(i / TILE_WIDTH)
        const inTileIdx = i % TILE_WIDTH
        const dstIdx = (s * tilesX * TILE_WIDTH + tileIdx * TILE_WIDTH + inTileIdx) * 4
        data[dstIdx] = positions[s][i * 3]
        data[dstIdx + 1] = positions[s][i * 3 + 1]
        data[dstIdx + 2] = positions[s][i * 3 + 2]
        data[dstIdx + 3] = 1.0
      }
    }

    const tex = new THREE.DataTexture(
      data,
      tilesX * TILE_WIDTH,
      tilesY,
      THREE.RGBAFormat,
      THREE.FloatType
    )
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.needsUpdate = true

    return { geometry: geo, dataTexture: tex, sectionCount: positions.length, tilesX }
  }, [count])

  useEffect(() => {
    return () => {
      geometry.dispose()
      dataTexture.dispose()
    }
  }, [geometry, dataTexture])

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
      uTilesX: { value: dataTexture.image.width / TILE_WIDTH },
      uVelocity: { value: 0 },
    }),
    [dataTexture, count, sectionCount]
  )

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return

    const clampedDelta = Math.min(delta, 0.1)
    const u = materialRef.current.uniforms
    u.uTime.value += clampedDelta
    u.uPixelRatio.value = state.gl.getPixelRatio()
    u.uVelocity.value = scrollState.velocity * 10

    const currentSection = scrollState.section
    const currentIdx = Math.max(0, SECTION_ORDER.indexOf(currentSection))
    const nextIdx = Math.min(SECTION_ORDER.length - 1, currentIdx + 1)

    u.uSectionIndex.value = currentIdx
    u.uNextSectionIndex.value = nextIdx
    u.uMorph.value = scrollState.sectionProgress

    pointsRef.current.rotation.y += clampedDelta * 0.02
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
          uniform float uTilesX;
          uniform float uVelocity;

          attribute float aIndex;

          varying float vAlpha;
          varying float vSeed;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          vec3 snoiseVec3(vec3 x) {
            return vec3(
              snoise(x),
              snoise(x + vec3(123.4, 341.7, 567.8)),
              snoise(x + vec3(234.5, 456.7, 678.9))
            );
          }

          vec3 sampleSection(float sectionIdx, float particleIdx) {
            float tileIdx = floor(particleIdx / 256.0);
            float inTileIdx = mod(particleIdx, 256.0);
            float x = (tileIdx * 256.0 + inTileIdx + 0.5) / (uTilesX * 256.0);
            float y = (sectionIdx + 0.5) / uSectionCount;
            return texture2D(uSectionData, vec2(x, y)).rgb;
          }

          void main() {
            float seed = fract(aIndex * 0.6180339887);
            vSeed = seed;

            vec3 posA = sampleSection(uSectionIndex, aIndex);
            vec3 posB = sampleSection(uNextSectionIndex, aIndex);
            float morph = smoothstep(0.0, 1.0, uMorph);
            vec3 pos = mix(posA, posB, morph);

            float vel = abs(uVelocity);
            vec3 noiseInput = pos * 0.8 + vec3(uTime * 0.15, uTime * 0.1, uTime * 0.12);
            vec3 curl = snoiseVec3(noiseInput);
            pos += curl * (0.2 + vel * 0.5);

            float drift = sin(uTime * 0.5 + seed * 6.2831) * 0.1;
            pos.y += drift;

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
