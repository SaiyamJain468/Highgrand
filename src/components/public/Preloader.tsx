"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const greetings = [
  "Hello",          // English
  "नमस्ते",         // Hindi
  "NAMASKAR",       // Indian / Sanskrit
  "SWAAGAT",        // Welcome (Hindi)
  "Hola",           // Spanish
  "Bonjour",        // French
  "Ciao",           // Italian
  "こんにちは",     // Japanese
  "你好",           // Chinese
  "Hallo",          // German
  "Привет",         // Russian
  "مرحبا",          // Arabic
  "VANAKKAM",       // Tamil
  "नमस्ते",         // Hindi 
]

export default function Preloader() {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (index === greetings.length - 1) return

    const timeout = setTimeout(() => {
      setIndex(prev => prev + 1)
    }, index === 0 ? 800 : 100) // Even snappier

    return () => clearTimeout(timeout)
  }, [index])

  useEffect(() => {
    const minDuration = 2000
    const startTime = Date.now()
    
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minDuration - elapsedTime)
      
      setTimeout(() => {
        setLoading(false)
      }, remainingTime)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as any, delay: 0.5 } 
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black"
        >
          {/* Transition Panels */}
          <div className="absolute inset-0 flex z-[-1] pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ transform: "translateY(0%)" }}
                exit={{ transform: "translateY(-100%)" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.76, 0, 0.24, 1] as any,
                  delay: i * 0.05
                }}
                className="flex-1 bg-brand-accentSurface border-x border-brand-border/10"
              />
            ))}
          </div>

          <div className="relative overflow-hidden h-[50px] sm:h-[80px]">
            <motion.p
              key={index}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: "circOut" }}
              className="font-bebas text-[50px] sm:text-[80px] text-brand-white uppercase tracking-tight"
            >
              {greetings[index]}
            </motion.p>
          </div>
          
          {/* Progress Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-brand-border/30">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-brand-accent shadow-[0_0_10px_rgba(200,169,110,0.5)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
