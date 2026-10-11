# Full-Immersive 3D Portfolio Redesign — Design Spec

**Date:** 2026-09-15
**Branch:** `design`
**Status:** Approved — ready for implementation planning

## Goal

Transform the existing portfolio from a static HTML/CSS site into a full-immersive 3D experience. The 3D scene is a persistent living background that reacts to scroll position, section changes, and mouse movement. Content remains fully readable HTML scrolling above the canvas.

**User's exact words:** "full immersive full 3D high complexity" — "just having a cool portfolio," not for client conversion.

**Visual direction:** Product showcase + minimal geometric (user-selected).

---

## Approved Decisions

| # | Decision | Choice |
|---|----------|--------|
| 1 | Brand | `DE<AI>DEV` visual, `DEAIDEV` metadata/SEO, domain `dearidev.dev` stays |
| 2 | Scene composition | Single persistent torus-knot anchor throughout all sections |
| 3 | Anchor shape | Torus-knot (`torusKnotGeometry`) |
| 4 | Interaction level | Content-reactive (3D responds to active section) |
| 5 | About page | Dedicated mini-scene (skill nodes orbiting the anchor) |
| 6 | Color system | Signal teal `#00C2B2` throughout, Spark amber `#F59E0B` reserved for CTA moment only |

---

## Architecture

### Canvas Layer (z-index: 0)

One fixed R3F Canvas mounted in `app/layout.tsx` via `next/dynamic` (`ssr: false`). Persists across all routes. Navigating to `/about` does not tear down WebGL — it triggers a camera transition.

```
app/layout.tsx
  ├── LenisProvider          ← smooth scroll + GSAP ticker wiring
  ├── SceneCanvas            ← fixed, position:fixed, z-index:0
  │     ├── CameraRig        ← reads scroll singleton, drives camera
  │     ├── AnchorGeometry   ← persistent torus-knot
  │     ├── ParticleField    ← morphs per section
  │     ├── Effects          ← bloom + vignette (desktop only)
  │     └── SectionLights    ← color shifts per section
  └── <children>             ← HTML content, z-index:10
```

### Scroll Singleton (`lib/scroll.ts`)

Plain mutable object updated by Lenis callback, read by `useFrame`. Zero React re-renders on scroll.

```ts
export const scrollState = {
  progress: 0,          // 0-1 total page scroll
  section: "hero",      // active section id
  sectionProgress: 0,   // 0-1 progress within current section
  pointer: { x: 0, y: 0 }, // normalized mouse position (-1 to 1)
}
```

### Section Detection

Each homepage section registers a DOM ref. On scroll, the section whose viewport bounding rect contains the viewport center wins. Its id is written to `scrollState.section`. The 3D scene reads this in `useFrame` and transitions.

---

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| Void | `#0A0A0F` | Dark section backgrounds, 3D scene background |
| Paper | `#F5F3EF` | Light section backgrounds (warm off-white) |
| Ink | `#1A1A1F` | Text on light sections |
| Mist | `#E8E6E1` | Text on dark sections |
| **Signal** | `#00C2B2` | Primary accent — teal, used throughout (links, hovers, highlights, anchor emissive) |
| **Spark** | `#F59E0B` | Reserved accent — amber, ONLY for CTA moment and active states |

**Design principle:** One dominant accent + one reserved "moment" color. The rarity of amber is what makes it land (Awwwards Swiss style lesson: "the rarity is what gives it power").

**3D scene background:** Lerps between `#0A0A0F` (dark sections) and `#F5F3EF` (light sections) as you scroll.

---

## 3D Scene Composition

### Anchor: Torus-Knot

- Geometry: `torusKnotGeometry args={[1, 0.35, 220, 32]}`
- Material: `meshPhysicalMaterial`, metalness 0.85, roughness 0.15, color `#1A2A2A` (dark teal-tinted)
- Emissive: Signal teal at 0.15 intensity → shifts to Spark amber at 0.4 intensity during CTA section
- Continuous slow rotation: ~0.1 rad/s
- Mouse parallax: camera offset ±0.3 based on `scrollState.pointer`
- Environment: Procedural `Lightformer` planes (no HDR file fetch)

### Particle Field (~2000 points desktop, ~800 mobile)

- `Points` with custom shader (size attenuation, soft round sprites)
- Color: Signal teal at low opacity, brightens near cursor
- Per-section morph targets packed in `DataTexture`, morph driven by `uMorph` uniform (zero CPU per frame):

| Section | Particle Behavior | Camera Position |
|---------|------------------|-----------------|
| Hero | Dense diagonal wave sweep | Center, slight orbit |
| Case Studies | Discrete clumps near card positions | Drifts right |
| Process | Thin horizontal strata | Pulls back |
| Pricing | Very sparse distant dots | Distant |
| CTA | Converging spiral toward anchor | Returns center |

### Post-Processing (desktop only, disabled <768px)

- Bloom: `luminanceThreshold={0.7}, intensity={0.6}, mipmapBlur`
- Vignette: `offset={0.3}, darkness={0.5}`

### About Page: Skill Constellation

- ~30 instanced spheres (12 on mobile) orbiting the torus-knot in 2–3 elliptical rings
- Color-coded by category:
  - Frontend: Signal teal `#00C2B2`
  - Backend: Soft blue `#6B9FFF`
  - AI/ML: Spark amber `#F59E0B`
  - Tools: Mist gray `#A8A6A1`
- Hover (raycast): sphere scales 1.5×, tooltip shows skill name
- On leaving About: constellation fades out, camera returns to homepage framing

---

## Content Layer (HTML Overlay)

All existing homepage sections stay as HTML scrolling over the fixed Canvas.

### Motion Reveals

Every section's content wrapped in `<Reveal>`:
- `viewport={{ once: true, margin: "-80px" }}` — play once, start 80px early
- Only animate `opacity` + `transform` (GPU-composited)
- Ease: `[0.16, 1, 0.3, 1]` (ease-out-expo)
- Reduced-motion: instant (no animation)

### Tilt Cards

Case study cards and process steps get 3D tilt on hover (Motion, not WebGL):
- Parent `perspective: 1200px`
- Card `rotateX`/`rotateY` springs, max ±8°
- Touch devices stay flat

### Section Backgrounds

- Dark sections (Hero, CaseStudies, CTA): `bg-void` with `bg-transparent` so 3D bleeds through
- Light sections (Process, Pricing): `bg-paper/90` with backdrop-blur — 3D shows as soft shapes behind frosted glass

### Pointer Events

- Content wrapper: `pointer-events: none`
- Interactive elements (links, buttons, cards): `pointer-events: auto`
- This lets mouse events reach the 3D scene for parallax while keeping UI clickable

---

## Performance & Fallbacks

### Canvas Config

- `dpr={[1, 1.75]}` — clamped, no full-retina
- `gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}`
- `frameloop="always"`, paused when tab hidden via IntersectionObserver

### Mobile Quality Tier

- Particle count: 2000 → 800
- Skill constellation: 30 → 12 spheres, no hover
- No post-processing
- DPR capped at 1
- Lenis `syncTouch: false`

### prefers-reduced-motion

Checked BEFORE `next/dynamic` import. If true:
- Three.js never downloaded (not in bundle)
- Static gradient background (void → paper)
- All Motion reveals become instant
- Lenis not initialized (native scroll)

### No WebGL

Canvas `fallback` prop renders the same static gradient.

### Lazy Loading

```tsx
const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
  loading: () => <StaticGradient />,
})
```

Text paints immediately, 3D loads after, crossfades in over 0.7s.

**Bundle impact:** Three.js + R3F + drei ≈ 180KB gzipped (client-side only, only when motion allowed).

---

## File Structure

### New Files

```
lib/
  scroll.ts                    ← scroll singleton (mutable object)
  gsap-config.ts               ← GSAP plugin registration

components/
  providers/
    LenisProvider.tsx          ← Lenis + GSAP ticker wiring
  canvas/
    SceneCanvas.tsx            ← fixed Canvas wrapper (dynamic import target)
    CameraRig.tsx              ← scroll-driven camera + mouse parallax
    AnchorGeometry.tsx         ← persistent torus-knot
    ParticleField.tsx          ← morphing particle system
    SectionLights.tsx          ← ambient + directional lights
    Effects.tsx                ← Bloom + Vignette (desktop only)
    SkillConstellation.tsx     ← About page orbiting spheres
  dom/
    Reveal.tsx                 ← Motion scroll reveal wrapper
    TiltCard.tsx               ← Motion 3D tilt card
    StaticGradient.tsx         ← fallback (reduced-motion / no-WebGL)
```

### Modified Files

```
app/layout.tsx                 ← add LenisProvider + SceneCanvas
app/page.tsx                   ← wrap sections in Reveal, add section refs
app/globals.css                ← Lenis CSS, new color tokens
app/about/page.tsx             ← add SkillConstellation + layout
components/layout/Header.tsx   ← brand: DE<AI>DEV
```

---

## Dependencies to Install

```
three
@react-three/fiber
@react-three/drei
@react-three/postprocessing
lenis
gsap
@gsap/react
motion
```

---

## Implementation Order

1. Install dependencies
2. `lib/scroll.ts` + `lib/gsap-config.ts` — foundations
3. `LenisProvider` + wire into layout
4. `SceneCanvas` + `CameraRig` + `AnchorGeometry` — minimal working 3D
5. `ParticleField` with section morphing
6. `SectionLights` + color system + `Effects`
7. `Reveal` + `TiltCard` + wire into homepage sections
8. Section detection (refs → scrollState.section)
9. About page: `SkillConstellation` + camera transition
10. Fallbacks: reduced-motion, no-WebGL, mobile tier
11. Brand fix: `DE<AI>DEV` header, metadata alignment
12. Test, lint, build

**Estimated scope:** ~15 new files, ~5 modified files.

---

## Out of Scope

- No WebGL page transition overlays (CSS transitions suffice)
- No HDR environment maps (procedural Lightformers only)
- No custom cursor (system cursor preserved for a11y)
- No backend changes (contact form stays mailto)
- Blog posts (Phase 12, user's work)
