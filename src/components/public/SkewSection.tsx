"use client"

import { useRef, ReactNode, useState, useEffect } from "react"
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion"

export default function SkewSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scrollVelocity = useVelocity(scrollYProgress)
  
  // Subtle skew: -2deg to 2deg on mobile, -5deg to 5deg on desktop
  const skewRange = isMobile ? [-2, 2] : [-5, 5]
  const skewVelocity = useTransform(scrollVelocity, [-1, 1], skewRange)
  
  const skewSpring = useSpring(skewVelocity, {
    stiffness: 120, // Snappier
    damping: 40
  })

  return (
    <motion.div
      ref={ref}
      style={{ skewY: skewSpring }}
      className="origin-center"
    >
      {children}
    </motion.div>
  )
}
