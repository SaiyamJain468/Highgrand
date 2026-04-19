"use client"

import { motion } from "framer-motion"

const brands = [
  "VAULT STREET", "NOIRE DELHI", "KULT IND.", "URBAN OAK", 
  "PRISM WEAR", "GHOST BLANKS", "AXEL STUDIO", "VINTAGE CO.",
  "RAW ATHLETICS", "NORTHERN DYE", "MODRN", "ETHIC LABS"
]

export default function BrandMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-brand-surface1 border-y border-brand-border/30 py-10 md:py-16">
      <div className="flex w-full overflow-hidden select-none">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex flex-nowrap gap-12 md:gap-24 items-center whitespace-nowrap min-w-full"
        >
          {/* First Set of Brands */}
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-2 h-2 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors" />
              <span className="font-bebas text-[24px] md:text-[32px] text-brand-muted/50 group-hover:text-brand-white transition-colors tracking-widest uppercase">
                {brand}
              </span>
            </div>
          ))}
          {/* Second Set of Brands for Seamless Loop */}
          {brands.map((brand, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-4 group">
              <div className="w-2 h-2 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors" />
              <span className="font-bebas text-[24px] md:text-[32px] text-brand-muted/50 group-hover:text-brand-white transition-colors tracking-widest uppercase">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Visual Fade Overlays */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-brand-surface1 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-brand-surface1 to-transparent z-10 pointer-events-none" />
    </div>
  )
}
