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
  
  // Transform velocity into skew
  const skewVelocity = useTransform(scrollVelocity, [-1, 1], [-5, 5])
  const skewSpring = useSpring(skewVelocity, {
    stiffness: 100,
    damping: 30
  })

  // Only apply skew on desktop for performance and cleaner mobile UX
  if (isMobile) return <div ref={ref}>{children}</div>

  return (
    <motion.div
      ref={ref}
      style={{ skewY: skewSpring }}
      className="origin-center transition-transform duration-300"
    >
      {children}
    </motion.div>
  )
}
