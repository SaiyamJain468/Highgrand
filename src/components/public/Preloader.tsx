"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const greetings = [
  "Hello",          // English
  "नमस्ते",         // Hindi
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",   // Punjabi
  "வணக்கம்",       // Tamil
  "Bonjour",        // French
  "Hola",           // Spanish
  "Ciao",           // Italian
  "こんにちは",     // Japanese
  "你好",           // Chinese
  "HALLO",          // German
  "SWAAGAT",        // Welcome
  "NAMASKAR",       // Sanskrit
  "স্বাগতম",        // Bengali
  "مرحبا",          // Arabic
  "OLÁ",            // Portuguese
  "안녕",           // Korean
  "SAWATDEE",       // Thai
  "YASAS",          // Greek
]

export default function Preloader() {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && index === 0) return // Exit safety

    const timeout = setTimeout(() => {
      setIndex(prev => (prev + 1) % greetings.length)
    }, index === 0 ? 1000 : 250) // More readable pace

    return () => clearTimeout(timeout)
  }, [index, loading])

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
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] as any, delay: 0.8 } 
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
        >
          {/* SKEWED TRANSITION PANELS (Curtain Effect) */}
          <div className="absolute inset-0 flex z-[-1] pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ transform: "translateY(0%) skewY(0deg)" }}
                exit={{ 
                  y: "-100%",
                  skewY: 10,
                  transition: { 
                    duration: 1.2, 
                    ease: [0.76, 0, 0.24, 1] as any,
                    delay: i * 0.08
                  } 
                }}
                className="flex-1 bg-brand-accentSurface border-x border-brand-border/5"
              />
            ))}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative overflow-hidden h-[50px] sm:h-[100px] mb-4">
              <motion.p
                key={index}
                initial={{ y: "100%", filter: "blur(15px)", opacity: 0 }}
                animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                exit={{ y: "-100%", filter: "blur(15px)", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as any }}
                className="font-bebas text-[45px] sm:text-[90px] text-brand-white uppercase tracking-tighter"
              >
                {greetings[index]}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 0.4, letterSpacing: "0.2em" }}
              transition={{ duration: 2 }}
              className="font-inter text-[10px] text-brand-accent uppercase font-black"
            >
              EST. DELHI 2013 / HIGHGRAND HQ
            </motion.div>
          </div>
          
          {/* Progress Indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-brand-border/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full bg-brand-accent shadow-[0_0_15px_rgba(200,169,110,0.6)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
