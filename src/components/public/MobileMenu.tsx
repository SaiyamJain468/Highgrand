"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"
import Magnetic from "./Magnetic"
import TextReveal from "./TextReveal"

interface NavLink {
  name: string
  href: string
  image?: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

const images = {
  Products: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
  About: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
  Contact: "https://images.unsplash.com/photo-1523450001312-daa4e2e12444?q=80&w=800&auto=format&fit=crop",
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const portalVariants = {
    hidden: { 
      clipPath: "circle(0% at 90% 5%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
    },
    visible: { 
      clipPath: "circle(150% at 90% 5%)",
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as any }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, y: 100, rotate: 5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.5 + i * 0.1, 
        ease: [0.76, 0, 0.24, 1] as any 
      }
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={portalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[100] bg-brand-black flex flex-col md:hidden overflow-hidden"
        >
          {/* Background Image Peek Layer */}
          <AnimatePresence>
            {hoveredLink && (
              <motion.div 
                key={hoveredLink}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.25, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-0 bg-cover bg-center grayscale mix-blend-luminosity"
                style={{ backgroundImage: `url(${images[hoveredLink as keyof typeof images]})` }}
              />
            )}
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black z-0 pointer-events-none" />

          {/* Header */}
          <div className="relative z-[110] flex justify-between items-center px-6 py-8">
            <span className="font-bebas text-brand-muted text-[13px] tracking-widest uppercase">Navigation</span>
            <Magnetic>
              <button 
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center bg-brand-surface1 border border-brand-border rounded-full text-brand-white cursor-pointer active:scale-95 transition-transform"
                style={{ position: 'relative', zIndex: 120 }}
              >
                <X size={24} />
              </button>
            </Magnetic>
          </div>

          {/* Navigation Links */}
          <div className="relative z-10 flex-1 flex flex-col justify-center px-8 gap-8 mt-[-10vh]">
            {links.map((link, i) => (
              <motion.div 
                key={link.name}
                custom={i}
                variants={linkVariants}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="group relative"
              >
                <Link 
                  href={link.href}
                  onClick={onClose}
                  className="flex items-end gap-6"
                >
                  <span className="font-inter text-brand-accent text-[12px] font-bold mb-2 opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                  <div className="overflow-hidden">
                    <h2 className="font-bebas text-[18vw] text-brand-white leading-none uppercase group-hover:text-brand-accent transition-colors duration-300">
                      {link.name}
                    </h2>
                  </div>
                </Link>
                <div className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-brand-accent group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Footer Reveal */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="relative z-10 p-8 border-t border-brand-border/30"
          >
            <div className="flex justify-between items-end">
              <div>
                <p className="font-inter text-[10px] text-brand-muted uppercase tracking-[0.2em] mb-4">India · Factory Direct</p>
                <div className="flex gap-4">
                  {['Instagram', 'WhatsApp'].map(social => (
                    <span key={social} className="font-inter text-[12px] text-brand-white/60 hover:text-brand-accent cursor-pointer transition-colors uppercase tracking-widest">{social}</span>
                  ))}
                </div>
              </div>
              <Link href="/register" onClick={onClose} className="font-bebas text-[20px] text-brand-white border-b border-brand-accent">
                Wholesale Portal 
              </Link>
            </div>
          </motion.div>
          
          {/* Aesthetic Noise Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[5]">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <filter id="noise">
                   <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
             </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
