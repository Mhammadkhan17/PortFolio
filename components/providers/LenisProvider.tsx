"use client"

import { ReactLenis, type LenisRef } from "lenis/react"
import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { setScrollProgress, setActiveSection, setSectionProgress, setPointer } from "@/lib/scroll"

const SECTION_IDS = ["hero", "case-studies", "process", "pricing", "cta", "about"]

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const lenis = lenisRef.current?.lenis

    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      setScrollProgress(limit > 0 ? scroll / limit : 0)

      const centerY = window.innerHeight / 2
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= centerY && rect.bottom >= centerY) {
          setActiveSection(id)
          const sectionH = rect.height
          setSectionProgress(sectionH > 0 ? (centerY - rect.top) / sectionH : 0)
          break
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
    }

    if (lenis) {
      lenis.on("scroll", onScroll)
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    return () => {
      gsap.ticker.remove(update)
      if (lenis) {
        lenis.off("scroll", onScroll)
      }
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [])

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis ref={lenisRef} root options={{ autoRaf: false, syncTouch: false }}>
      {children}
    </ReactLenis>
  )
}
