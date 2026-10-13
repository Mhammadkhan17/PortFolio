"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect, useSyncExternalStore } from "react"

function subscribePointerFine(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)")
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

function getPointerFineSnapshot() {
  return window.matchMedia("(pointer: fine)").matches
}

function getPointerFineServerSnapshot() {
  return false
}

export function CustomCursor() {
  const isPointer = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot
  )
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const springX = useSpring(x, { stiffness: 500, damping: 40 })
  const springY = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (!isPointer) return

    const onMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [isPointer, x, y])

  if (!isPointer) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-[100] h-6 w-6 rounded-full border border-signal/50"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    />
  )
}
