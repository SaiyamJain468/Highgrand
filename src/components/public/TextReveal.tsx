"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  staggerChildren?: number
  once?: boolean
}

export default function TextReveal({ 
  children, 
  className = "", 
  delay = 0, 
  staggerChildren = 0.02,
  once = true 
}: TextRevealProps) {
  const words = children.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerChildren, 
        delayChildren: delay * i 
      },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        type: "spring" as any,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: "100%",
      skewY: 10,
      transition: {
        type: "spring" as any,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.span
      style={{ overflow: "hidden", display: "inline-flex" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
