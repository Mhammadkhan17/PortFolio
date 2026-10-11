"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { type ReactNode, useRef } from "react"

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

  const isTouch =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isTouch) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div ref={ref} style={{ perspective: 1200 }} className={className}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
