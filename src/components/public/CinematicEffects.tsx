"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 100 }
  const mainX = useSpring(mouseX, springConfig)
  const mainY = useSpring(mouseY, springConfig)

  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"]') || target.classList.contains('cursor-pointer')
      setIsHovered(!!isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      <motion.div
        style={{
          left: mainX,
          top: mainY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isHovered ? 80 : 12,
          height: isHovered ? 80 : 12,
          backgroundColor: isHovered ? "rgba(200, 169, 110, 0.15)" : "rgba(200, 169, 110, 1)",
          border: isHovered ? "1px solid rgba(200, 169, 110, 0.4)" : "none",
        }}
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference hidden md:block"
      />
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        className="fixed w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
    </>
  )
}

export function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[80] opacity-[0.035] mix-blend-overlay hidden md:block">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
}

export function BackgroundAura() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const auraX = useSpring(mouseX, { damping: 50, stiffness: 50 })
  const auraY = useSpring(mouseY, { damping: 50, stiffness: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <motion.div
        style={{
          left: auraX,
          top: auraY,
          x: "-50%",
          y: "-50%",
        }}
        className="absolute w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px]"
      />
    </div>
  )
}
