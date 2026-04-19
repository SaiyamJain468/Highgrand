"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedListProps {
  children: ReactNode[]
  className?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.76, 0, 0.24, 1] as any 
    } 
  }
}

export default function AnimatedList({ children, className }: AnimatedListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={item} className="h-full">
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
