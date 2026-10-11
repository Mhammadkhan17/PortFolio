# 3D Portfolio Reference — Complete Research Report

Research for implementing full immersive 3D on the portfolio (branch: `design`).

**Goal:** Cool portfolio for self-expression. Not conversion-optimized. Mix of **product-showcase + minimal-geometric** visual language.
**Architecture direction:** Living 3D background behind HTML content (single fixed R3F Canvas + scrollable overlay).

---

## Table of Contents
1. [Reference Projects](#reference-projects)
2. [Architecture Patterns](#architecture-patterns)
3. [Recommended Stack](#recommended-stack)
4. [Performance Rules](#performance-rules)
5. [Mobile & Accessibility Fallbacks](#mobile--accessibility-fallbacks)
6. [Code Patterns & Snippets](#code-patterns--snippets)
7. [Technique Menu](#technique-menu)
8. [Design Synthesis](#design-synthesis)

---

## Reference Projects

### Tier 1 — Closest Match to Our Direction

#### 1. imfemambocus/portfolio
**Link:** https://github.com/imfemambocus/portfolio
**Pattern:** One particle field (160,000 points) morphs into a different form per section. Single element evolves the whole way down — not separate animations per section.
**Stack:** Vite, React 19, TypeScript, R3F, custom GLSL, GSAP + ScrollTrigger + SplitText, Lenis, Tailwind v4
**Key architecture:**
```
src/
  scroll.ts               # the only scroll listener in the app
  pointer.ts              # the only pointer listener in the app
  theme.ts                # light/dark shared by DOM and canvas
  Scene.tsx               # canvas, camera drift, bloom
  particles/
    layouts.ts            # six forms (hero waves, profile cloud, experience strata, skill clusters, work clumps, contact waves)
    shaders.ts            # the morph shader
    rng.ts                # seeded generator (reproducible)
    ParticleField.tsx     # packs layouts into DataTexture, drives uniform
```
**How the morph works:**
- Every form generated once at startup, packed into a single floating-point `DataTexture` (each form = one tile)
- Scroll position → fractional layout index → vertex shader fetches two adjacent tiles and mixes
- **Tiling trick:** forms tiled 256 texels wide (not one row per form) to stay under MAX_TEXTURE_SIZE
- Scrolling costs **zero per-frame CPU work** — only one float uniform changes
- Particles arc via `sin(t * PI)` swell + curl-flow noise (bloom outward then reconverge)
- Each form carries offset, opacity, pointer strength interpolated on same morph value
**Steal:** One scroll listener, section-driven particle morphing, DataTexture packing, seeded PRNG for reproducibility, "one source of scroll truth" principle.

---

#### 2. Sam-T-G/Sam-Portfolio-DevOne
**Link:** https://github.com/Sam-T-G/Sam-Portfolio-DevOne
**Pattern:** Entire site is one continuous 3D world with cinematic camera choreography. Central octahedron anchor + ambient geometry per section.
**Stack:** Next.js 16, React 19, TypeScript, R3F 9.4, drei 10.7, GSAP 3.13, Framer Motion 12, Tailwind 4, Lenis 1.3
**Key architecture:**
```
PermanentSceneBackground (fixed, z-0)
  └─ ChoreographedGeometry
       ├─ Camera choreography (4 trajectories, custom easing per section)
       ├─ CinematicShowcase (per-project signature geometry)
       ├─ AmbientGeometry (section-tied fades)
       └─ Central Octahedron (anchor)
Content sections (z-10+) float above
```
**Per-project signature geometry:** Icosahedron, Dodecahedron, Octahedron, Tetrahedron + 150-particle spherical field + color-coded theming.
**Steal:** Central persistent anchor shape; per-project signature geometry + color identity; ambient geometry fades per section.

---

#### 3. Overlook-Strategy/three-altitudes
**Link:** https://github.com/Overlook-Strategy/three-altitudes
**Pattern:** Next.js 16 + R3F. Three atmosphere zones (kinetic/fluid/vector). Camera rail driven by scroll. Background color lerp + fog transitions.
**Stack:** Next.js 16, R3F, drei, GSAP, Lenis, Tailwind, TinaCMS
**Key architecture:**
```
contexts/ScrollContext.tsx    # Lenis + GSAP ScrollTrigger wiring, global scroll state
hooks/useProgress.ts          # Per-frame scroll state for R3F (no React re-renders)
components/canvas/
  MainCanvas.tsx              # Fixed R3F Canvas, EffectComposer, lighting
  SceneManager.tsx            # Camera rail, background lerp, fog, uniform updates
components/atmosphere/        # KineticAtmosphere, FluidAtmosphere, VectorAtmosphere
```
**Scroll engine:**
1. Lenis provides smooth inertial scrolling
2. Lenis fires `ScrollTrigger.update()` on every scroll tick
3. `ScrollContext` exposes progress (0–1), velocity, atmosphere to React
4. `SceneManager` reads scroll in `useFrame` (no React overhead): camera Z (10 → -100), background color lerp, fog near/far, transition uniforms
**Steal:** SceneManager pattern (camera rail + color lerp + fog in one place), useProgress hook for zero-rerender scroll.

---

#### 4. Ali-Sanati/awwwards-portfolio
**Link:** https://github.com/Ali-Sanati/awwwards-portfolio
**Pattern:** Full tutorial walkthrough for awwwards-level 3D portfolio. 3D hero with animated planet + golden ring, scroll-triggered services, works with hover overlays, clip-path image reveal, marquee contact.
**Stack:** React (Vite), Tailwind, GSAP, Three.js, R3F, drei
**Stars:** 160
**Steal:** Production-quality section-by-section walkthrough; hero 3D composition.

---

### Tier 2 — Strong Production Patterns

#### 5. justinpeterman-droid/web
**Link:** https://github.com/justinpeterman-droid/web
**Pattern:** Multi-page Next.js site with **persistent R3F Canvas** that stays mounted across routes. `RouteSceneSync` maps pathname → scene id so navigation never tears down WebGL.
**Stack:** Next.js 16, React 19, TypeScript, Tailwind 4, three, R3F, drei, gsap, lenis, sanity, react-hook-form, zod, resend
**Routes:** `/`, `/work`, `/work/[slug]`, `/about`, `/contact`
**Steal:** Persistent canvas across route changes (no WebGL context recreation).

---

#### 6. ewjdev/r3f-starter
**Link:** https://github.com/ewjdev/r3f-starter
**Pattern:** Production-ready Next.js 16 + R3F starter. Tunnel-rat for HTML↔R3F communication. 2D/3D view toggle. Modular sandbox architecture.
**Stack:** Next.js 16, R3F, drei, postprocessing, rapier, uikit, GLSL (glslify), Zustand, Tailwind 4, TypeScript
**Key structure:**
```
app/layout.tsx           # Root layout with 3D canvas
src/components/canvas/   # 3D components (Scene.tsx, HomeScene.tsx, View.tsx)
src/components/dom/       # 2D components
src/helpers/global.ts    # Tunnel-rat setup
src/sandboxes/           # 3D scene modules
```
**Steal:** Tunnel-rat pattern; Next.js 16 App Router + R3F wiring conventions.

---

#### 7. kalashree225/3d-webgl-portfolio
**Link:** https://github.com/kalashree225/3d-webgl-portfolio
**Pattern:** Next.js 16 + React 19 + R3F + GSAP + Lenis. Decoupled 3D render thread from DOM thread.
**Architecture:**
```
Next.js App Layout → Main Page → Scroll Container & Lenis → SceneCanvas
  → R3F → WebGL Renderer Loop → TechSphere / ContactGlobe
  → GSAP ScrollTrigger Timeline (controls DOM)
```
**Key structure:**
```
src/components/canvas/    # ContactGlobe.tsx, TechSphere.tsx, SceneCanvas.tsx
src/components/layout/    # Header, footer, navigation
src/components/sections/  # Hero, About, Skills, Projects
```
**Steal:** Canvas/sections/layout component separation; decoupled render threads.

---

#### 8. kbtale/portfolio
**Link:** https://github.com/kbtale/portfolio
**Pattern:** Next.js 16 + Three.js + GSAP 3.14 + Lenis. Raw CSS Modules, custom WebGL shaders, physics-based animations. No UI component libraries.
**Stack:** Next.js 16.1.6, TypeScript 5.9.3, React 19.2.3, Three.js r160+, R3F, GSAP 3.14, Lenis, next-intl, Resend
**Steal:** Minimal-dependency approach; CSS Modules + CSS Variables for design tokens.

---

#### 9. nghub/3d-portfolio-with-keyboard (TinoJHB/3d-portfolio100)
**Link:** https://github.com/nghub/3d-portfolio-with-keyboard
**Pattern:** Next.js 16 + R3F + Tailwind 4 + Lenis. Mechanical keyboard hero scene, seasonal themes, bilingual (ES/EN), custom cursor, magnetic targets.
**Key components:**
```
FrozenKeyboard.tsx        # 3D keyboard scene (R3F)
FrozenBackground.tsx      # Animated background particles
CustomCursor.tsx          # Custom cursor with hover states
MagneticTargets.tsx       # Magnetic snap on interactive elements
Reveal.tsx                # Scroll-triggered reveal animations
smooth-scroll.tsx         # Lenis smooth scroll wrapper
```
**Steal:** Magnetic cursor/targets; Reveal component pattern; Lenis wrapper.

---

#### 10. venkatasailesh/My-Portfolio
**Link:** https://github.com/venkatasailesh/my-portfolio
**Pattern:** One unique lazy-loaded 3D scene per section. React 19 + Vite (not Next, but patterns portable).
**Scenes:** Hero=starfield, About=neural net, Skills=noise sphere, Experience=cityscape, Education=orrery, Contact=wave terrain.
**Key techniques:**
- WebGL detection + graceful fallback
- `React.lazy()` + `Suspense` per scene → code-split Three.js
- TiltCard using Framer Motion perspective transforms
- HDR bloom via `@react-three/postprocessing`
- Glassmorphism UI, animated counters, custom magnetic cursor
**Steal:** Per-section scene variety; WebGL feature detection; lazy Scene mounting; TiltCard pattern.

---

### Tier 3 — Advanced / Aspirational

#### 11. hari-houdini/me-portfolio
**Link:** https://github.com/hari-houdini/me-portfolio
**Pattern:** Every visual is authored code — no purchased assets. Custom GLSL shaders + procedural generation. Payload CMS v3.
**Stack:** React Router v7, R3F, drei, postprocessing, ScrollControls, GSAP, Tailwind 4, Effect-ts, Zod v4, Payload CMS v3, Vite 7, Biome 2
**Steal:** Fully procedural approach (no GLB assets needed).

---

#### 12. Jonathan-Jesni/portfolio-ver-2
**Link:** https://github.com/Jonathan-Jesni/portfolio-ver-2
**Pattern:** Scroll-driven WebGL laptop that "boots" as you scroll, then dissolves into live Projects section. Liquid-obsidian preloader, ember burn wipe (custom GLSL). Matter.js physics skills cloud.
**Stack:** Next.js 16, React 19, TypeScript, three, R3F, drei (Draco GLB), GSAP + ScrollTrigger, Lenis, Matter.js
**Mobile:** Phones get terminal-style boot preloader + name-split scroll hero instead of WebGL laptop.
**Steal:** Mobile-specific alternate experience (not just reduced quality — different design).

---

#### 13. emineugurlu/3d-portfolio
**Link:** https://github.com/emineugurlu/3d-portfolio
**Pattern:** Interactive 3D island environment with flight mechanics, spatial audio, cinematic transitions. GLTF orchestration.
**Stack:** React, React Router, Three.js, R3F, drei, Tailwind
**Steal:** Spatial audio integration; cinematic transition techniques.

---

#### 14. Studio K95 (Awwwards SOTD Aug 11 2026)
**Link:** https://dokle.design/awards/k95-portfolio-floats-klein-blue
**Pattern:** Whole portfolio floats in 3D Klein-blue void. Projects as tilted panels suspended in space. Toggle switches between RINGS and SPIRAL arrangements. Single saturated ultramarine background with faint grid for depth.
**Why it matters:** Proves one bold color + spatial layout + plain typography = coherent 3D identity. Restraint after motion lands harder.
**Steal:** Single saturated background color; spatial project panels; toggle between geometries; quiet typography after motion.

---

#### 15. fromanother.love (Awwwards)
**Link:** https://www.awwwards.com/designing-for-an-identity-that-shapeshifts.html
**Pattern:** Light swirls as environment. Background shifts through color states per section. Foreground stays clean/minimal/typographic. Text surfaces through blur and fade. Page transitions bleed/diffuse.
**Key insight:** "The real 3D went where it counts: the ripple on Three.js/R3F. The discipline wasn't building everything from scratch. It was knowing which illusions to cheat and which to build." Background transitions are videos + opacity/blend modes, not shaders.
**Stack:** Next.js, Prismic CMS, GSAP, Three.js, R3F, Web Animations API
**Steal:** Cheat cheap effects with CSS/video; reserve real 3D for the centerpiece.

---

#### 16. Codrops: Scroll-driven 3D world
**Link:** https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/
**Pattern:** Each section its own 3D scene. Camera walks through them. Tesseract unfold transition.
**Techniques:** GSAP Observer for unified mouse/touch/trackpad input; snap-scroll mode switching; Ink Bleed shader; NDC-pinned overlay quads.
**Steal:** The ceiling of what's possible. Craft reference, not template.

---

#### 17. Gheat1/portfolio
**Link:** https://github.com/Gheat1/portfolio
**Pattern:** Camera flies through three scenes (particle field → skills core → CRT monitor corridor) on one GSAP timeline. "Scrolling never re-renders React."
**Architecture:**
```
page scroll → GSAP ScrollTrigger (scrub) → master timeline → rig (mutable singleton) → useFrame loop → camera + meshes
```
**Stack:** React 19, TypeScript, Vite 6, R3F 9, drei 10, postprocessing 3, GSAP 3
**Steal:** The `rig` mutable singleton pattern — GSAP writes outside React, R3F reads inside useFrame. Zero React re-renders on scroll.

---

#### 18. DivyTR/Portfolio
**Link:** https://github.com/DivyTR/Portfolio
**Pattern:** Camera flies through a 3D trench. Tron-style grid, matrix rain particles, floating wireframe geometry, volumetric fog. Falls back to static CSS if WebGL unavailable.
**Key files:** CyberScene.tsx, CameraRig.tsx, MatrixRain.tsx, FloatingGeometry.tsx, Trench.tsx
**Steal:** Graceful WebGL degradation; scroll-driven camera rig.

---

#### 19. Gyanranjan-Priyam/portfolio-2.0
**Link:** https://github.com/Gyanranjan-Priyam/portfolio-2.0
**Pattern:** Three-layer architecture: 3D background → DOM content → fluid simulation overlay. "Window" cutouts carved into content layer let 3D bleed through.
**Stack:** Next.js 14 (Pages Router), R3F, Three.js, Drei, Rapier, GSAP + ScrollTrigger, Lenis, Zustand, SCSS Modules
**Steal:** Window cutout technique (box-shadow insets); fluid cursor overlay with mix-blend-mode.

---

#### 20. mmdalipour/particle-morph
**Link:** https://github.com/mmdalipour/particle-morph
**Pattern:** Publishable React component library for particle morph effects. Model particlization, shape morphing, scroll integration, responsive particle counts.
**Responsive config:**
```tsx
targetParticleCount={{ [0]: 3000, [768]: 6000, [1024]: 10000 }}
particleSize={{ [0]: 1.8, [768]: 2.4, [1024]: 3 }}
camera={{ position: { [0]: [0,0,15], [768]: [0,0,12], [1024]: [0,0,10] } }}
```
**Steal:** Pixel-breakpoint responsive quality config pattern.

---

## Architecture Patterns

### Pattern A: Fixed Canvas + Scrollable Overlay (RECOMMENDED)
```
+------------------------------------------+
|  FIXED: <Canvas> (z-index: 0)            |
|  - 3D scene fills viewport               |
|  - Responds to scroll via mutable refs   |
+------------------------------------------+
|  SCROLLABLE: <div> (z-index: 10)         |
|  - HTML sections scroll over the canvas  |
|  - Semi-transparent cards (backdrop-blur) |
|  - pointer-events: none on empty space   |
|  - pointer-events: auto on interactive   |
+------------------------------------------+
```
- Canvas is `position: fixed; inset: 0`
- HTML scrolls on top
- ScrollTrigger reads scroll, animates 3D scene via **refs** (never React state)
- Most common architecture for scroll-driven 3D

### Pattern B: Mutable Scroll Singleton (ZERO re-renders)
```
scroll.ts (only scroll listener)
  → Lenis callback updates mutable object
    → useFrame reads without causing React re-renders
      → camera.position.lerp(target, 0.1)
```
- One module owns scroll state
- Everything else reads from it
- Independent scroll listeners = desync + jank

### Pattern C: Persistent Canvas Across Routes
```
app/layout.tsx
  └─ <Canvas> (never unmounts)
       └─ <Outlet /> (DOM content swaps)
            └─ tunnel-rat / View portals (3D content per route)
```
- Canvas survives navigation
- Only DOM content swaps
- Avoids expensive WebGL context recreation

### Pattern D: GSAP Timeline + Camera Refs (Cinematic)
```tsx
const cameraAnim = useRef({ x: 0, y: 0, z: 8 })
const tl = gsap.timeline({
  scrollTrigger: { trigger: container, start: "top top", end: "bottom bottom", scrub: 1 }
})
tl.to(cameraAnim.current, { x: 0, y: 5, z: 5, duration: 1 }, 0)
  .to(cameraAnim.current, { x: 1.5, y: 2, z: 2, duration: 2 }, 1)

// In R3F useFrame:
camera.position.lerp(cameraAnim.current, 0.1)
```

### Pattern E: Particle Field Morph (imfemambocus)
```
Startup: Generate N form layouts → pack into DataTexture (tiled)
Scroll:  scrollProgress → fractional index → uMorph uniform
Shader:  position = mix(sampleLayout(i0), sampleLayout(i1), t)
Runtime: Only uMorph changes — zero CPU per frame
```

---

## Recommended Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 (App Router) | Already in use |
| 3D | three.js + @react-three/fiber + @react-three/drei | Standard R3F stack |
| Post-processing | @react-three/postprocessing | Bloom, vignette, noise |
| Scroll | Lenis + GSAP ScrollTrigger | Canonical smooth scroll + choreography |
| Animation | motion (Framer Motion) | Content reveals, UI transitions, tilt cards |
| Styling | Tailwind CSS v4 | Already in use |
| State | Zustand (optional) | Lightweight if needed for cross-component state |

### Dependencies to Install
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install lenis gsap @gsap/react
npm install motion
```

---

## Performance Rules

### Canvas Configuration
```tsx
<Canvas
  dpr={[1, 1.75]}           // Clamp DPR — full retina doubles fragment work
  frameloop="always"        // Or "demand" + invalidate() for static scenes
  gl={{
    powerPreference: "high-performance",
    antialias: true,
    alpha: true,
  }}
  camera={{ fov: 45, position: [0, 0, 8], near: 0.1, far: 100 }}
>
```

### On-Demand Rendering
- `frameloop="demand"`: only renders when props change or `invalidate()` called
- Use IntersectionObserver to stop rendering when canvas off-screen
- For constantly-moving scenes: keep `"always"` but pause when tab hidden

### Instancing
```tsx
<Instances limit={1000}>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial />
  {items.map(item => (
    <Instance key={item.id} position={item.position} color={item.color} />
  ))}
</Instances>
```
- One draw call instead of N
- Essential for particles, repeated geometry

### Disposal
- R3F auto-disposes declaratively-mounted geometry/materials
- Manually-created objects: dispose in `useEffect` cleanup
- Never create geometry/material in `useFrame`

### useFrame Best Practices
- Mutate refs, don't setState in the loop
- Use `delta` for frame-rate-independent motion
- Reuse vectors declared outside the callback
- No allocations inside useFrame

### Post-Processing (Desktop Only)
```tsx
<EffectComposer>
  <Bloom mipmapBlur luminanceThreshold={0.6} intensity={0.8} />
  <Vignette offset={0.3} darkness={0.6} />
</EffectComposer>
```
- Disable on mobile / low-tier devices
- `mipmapBlur` is faster than default bloom blur

### Lenis + GSAP Integration (Critical)
```tsx
// autoRaf: false — let GSAP ticker drive Lenis (one RAF loop)
const lenis = new Lenis({ autoRaf: false })
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```
- Never leave `scroll-behavior: smooth` in CSS (fights Lenis)
- Always destroy Lenis on unmount

### PerformanceMonitor (Drei)
```tsx
<PerformanceMonitor onIncline={() => setDpr(1.75)} onDecline={() => setDpr(1)}>
  {/* scene */}
</PerformanceMonitor>
```
- Auto-adjusts quality based on measured FPS
- Set upper/lower bounds to avoid ping-ponging
- `flipflops` + `onFallback` for worst-case floor

---

## Mobile & Accessibility Fallbacks

### Three-Tier Degradation
```tsx
type Tier = 'A' | 'B' | 'C'

function detectTier(prefersReducedMotion: boolean): Tier {
  if (prefersReducedMotion) return 'C'
  if (!('WebGLRenderingContext' in window)) return 'C'
  const memory = (navigator as any).deviceMemory ?? 4
  if (memory <= 2) return 'B'
  return 'A'
}

// Tier A: Full scene (dense particles, DPR 1.75, bloom, postprocessing)
// Tier B: Simplified (fewer particles, DPR 1.25, no postprocessing)
// Tier C: Static poster image (no Three.js download at all)
```

### prefers-reduced-motion
```tsx
// Detect before mounting Canvas
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

if (prefersReducedMotion) {
  return <StaticGradientFallback />  // Never download Three.js
}
```
- Check BEFORE dynamic import
- Use `next/dynamic` with `ssr: false` so Three.js never enters reduced-motion users' bundles
- Fallback should be a real design (static gradient / poster), not blank space

### WebGL Detection
```tsx
<Canvas fallback={<StaticFallback />}>
  {/* scene */}
</Canvas>
```
- R3F Canvas has built-in `fallback` prop for no-WebGL
- Add error boundary for context crashes

### Mobile Quality Reductions
- Particle count: 60–70% reduction
- DPR: cap at 1
- No post-processing effects
- Simpler geometry (fewer segments)
- `syncTouch: false` on Lenis for better iOS performance
- Never use `pin: true` on ScrollTrigger for mobile (iOS URL bar breaks it)

### Next.js Integration
```tsx
// Always dynamic import with ssr: false
const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
  loading: () => <StaticPoster />,
})
```
- Three.js accesses browser APIs during import
- `'use client'` on any component using motion/R3F

---

## Code Patterns & Snippets

### Lenis Provider (Next.js App Router)
```tsx
// components/providers/LenisProvider.tsx
"use client"
import { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      syncTouch: false,
    })
    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

Required CSS (globals.css):
```css
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
```

### Scroll Singleton
```ts
// lib/scroll.ts
export const scrollState = {
  progress: 0,      // 0-1 total page progress
  velocity: 0,
  section: "hero",  // current section id
}

// Updated by Lenis callback, read by useFrame
```

### useFrame Camera Rig (zero re-renders)
```tsx
"use client"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

export function CameraRig() {
  const target = useRef(new THREE.Vector3(0, 0, 8))

  useFrame((state, delta) => {
    // Map scroll progress to camera position
    const p = scrollState.progress
    target.current.set(
      Math.sin(p * Math.PI) * 2,
      p * 3,
      8 - p * 4
    )
    state.camera.position.lerp(target.current, delta * 2)
    state.camera.lookAt(0, 0, 0)
  })

  return null
}
```

### Scroll-Triggered Reveal (Motion)
```tsx
// components/Reveal.tsx
"use client"
import { motion } from "motion/react"
import type { ReactNode } from "react"

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### 3D Tilt Card (Motion — no WebGL)
```tsx
// components/TiltCard.tsx
"use client"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

export function TiltCard({
  children,
  maxTilt = 8,
  className,
}: {
  children: ReactNode
  maxTilt?: number
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    { stiffness: 200, damping: 30 }
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    { stiffness: 200, damping: 30 }
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
```

### GSAP Section Choreography
```tsx
"use client"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function SectionChoreography() {
  const sectionRef = useRef<HTMLElement>(null)
  const cameraRef = useRef({ x: 0, y: 0, z: 8 })

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      tl.to(cameraRef.current, { x: 2, y: 1, z: 6, duration: 1 }, 0)
        .to(cameraRef.current, { x: -1, y: 2, z: 5, duration: 1 }, 1)
    },
    { scope: sectionRef }
  )

  return <section ref={sectionRef}>{/* ... */}</section>
}
```

### Post-Processing Effects
```tsx
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

<EffectComposer>
  <Bloom
    mipmapBlur
    luminanceThreshold={0.6}
    luminanceSmoothing={0.9}
    intensity={0.8}
  />
  <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.15} />
  <Vignette offset={0.3} darkness={0.6} />
</EffectComposer>
```

### Procedural Environment (no HDR file)
```tsx
import { Environment, Lightformer } from "@react-three/drei"

<Environment resolution={256}>
  <Lightformer intensity={2} position={[0, 5, -9]} scale={[10, 10, 1]} />
  <Lightformer intensity={1} position={[0, 0, -6]} scale={[10, 10, 1]} />
  <Lightformer intensity={1} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[10, 10, 1]} />
</Environment>
```

### Drei Components We'll Use
| Component | Purpose |
|-----------|---------|
| `Float` | Gentle floating motion for meshes |
| `Environment` | Procedural or HDR environment lighting |
| `Lightformer` | Custom light shapes for Environment |
| `Instances` / `Instance` | InstancedMesh with React API |
| `PerformanceMonitor` | Auto FPS-based quality adjustment |
| `AdaptiveDpr` | Dynamic DPR adjustment |
| `PerspectiveCamera` | Camera with ref control |
| `Sparkles` | Built-in particle effect |
| `Stars` | Built-in starfield |
| `Float` | Breathing/floating animation |
| `Center` | Auto-center meshes |
| `ContactShadows` | Ground contact shadows |
| `useProgress` | Asset loading progress |
| `useGLTF` / `useTexture` | Asset loading with cache |

---

## Technique Menu

| Technique | Effort | Impact | Best for |
|-----------|--------|--------|----------|
| One object rendered with weight | Low | High | Hero centerpiece |
| Scroll as narrative device | Medium | High | Section choreography |
| Full-viewport GLSL shader behind typography | Low | High | Background atmosphere |
| Scene per product/section | High | Highest | Project showcase |
| Particle field morphing | Medium | High | Living background |
| Persistent anchor + ambient morphs | Medium | High | Continuous world |
| Camera rail / cinematic path | Medium | Highest | Storytelling scroll |
| Window cutouts in content layer | Medium | Medium | 3D bleed-through |
| 3D tilt cards (CSS/Motion only) | Low | Medium | Card interactions |
| Procedural environment (Lightformer) | Low | Medium | Realistic lighting |

**Throughline:** The best Three.js sites of 2026 commit to one hard idea and budget everything around it.

---

## Design Synthesis

### Scene Concept
One **fixed R3F Canvas** behind all HTML content. A central anchor geometry (slow-rotating icosahedron or torus-knot) persists the entire scroll; ambient particle field and secondary geometry morph per section. No heavy GLB models — low-poly solids + good lighting + soft bloom.

**Visual language:** Minimal geometric — floating low-poly solids (icosahedron, torus, octahedron), soft ambient particles, subtle color shifts per section. ITOM lesson: flat geometry with good lighting > heavy assets for immersion-per-KB.

### Per-Section Choreography
| Section | 3D Behavior | Color/Mood |
|---------|-------------|------------|
| **Hero** (dark) | Anchor center-stage, camera mouse-parallax, particle field dense | Cool blue/teal, subtle bloom |
| **Case Studies** (dark) | Anchor drifts slightly; particles re-form; card hover could shift color uniform | Same cool palette |
| **Process** (light) | Geometry becomes wireframe/outline; particles thin out; calmer | Warm neutral, low contrast |
| **Pricing** (light) | Distant floating shapes only; minimal particles | Clean, spacious |
| **CTA** (dark) | Anchor returns to center; particles converge; warm accent | Amber/gold accent |
| **About page** | Own mini-scene or hero scene re-framed | Consistent with above |

### Content Layer
- Standard HTML with Framer Motion `whileInView` reveals
- 3D tilt on case study cards and process steps (Motion, not WebGL)
- `pointer-events: none` on decorative layers, `auto` on interactive
- Semi-transparent cards with backdrop-blur for 3D bleed-through

### File Structure (planned)
```
portfolio-app/
  components/
    canvas/
      SceneCanvas.tsx      ← fixed Canvas wrapper, dynamic import
      AnchorGeometry.tsx   ← persistent central shape
      ParticleField.tsx    ← section-morphing particles
      SectionGeometry.tsx  ← per-section secondary shapes
      CameraRig.tsx        ← scroll-driven camera
      Effects.tsx          ← post-processing (desktop only)
    dom/
      LenisProvider.tsx    ← Lenis + GSAP wiring
      ScrollProvider.tsx   ← scroll singleton context
      Reveal.tsx           ← Motion scroll reveal
      TiltCard.tsx         ← Motion 3D tilt
    home/
      Hero.tsx, CaseStudies.tsx, Process.tsx, Pricing.tsx, CTA.tsx
  lib/
    scroll.ts              ← scroll singleton (mutable object)
    gsap-config.ts         ← GSAP plugin registration
```

### Open Decisions (user input needed)
1. **Brand name** — header says `DE<AI>DEV`, metadata says `DEAIDEV`, domain is `dearidev.dev`. Which is canonical?
2. **Scope of 3D** — full-page living background (all sections, recommended) vs. hero-only 3D with standard scroll below?
3. **Anchor shape** — icosahedron, torus-knot, or abstract custom geometry?
4. **Color palette** — cool blue/teal (hero) → warm neutral (process) → amber (CTA)? Or different scheme?
5. **About page** — own 3D scene or reuse homepage scene with different camera framing?
