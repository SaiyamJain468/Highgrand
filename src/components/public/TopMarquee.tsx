"use client"

import { motion } from "framer-motion"

export default function TopMarquee() {
  const items = [
    "LIVE RESTOCK: BLACK OVERSIZED TEES READY",
    "SHIPPING NATIONWIDE - DELHI TO KERALA",
    "BULK DISCOUNTS UNLOCKED FOR APPROVED RESELLERS",
    "NEW DROP: ACID WASH SERIES LIVE",
    "ESTABLISHED 2013 - 12 YEARS OF CRAFT"
  ]

  return (
    <div className="bg-brand-accent h-8 flex items-center overflow-hidden border-b border-brand-black/10 select-none">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex whitespace-nowrap gap-12 items-center min-w-full"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="font-inter font-black text-[10px] text-brand-black uppercase tracking-[0.1em]">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-black/20" />
          </div>
        ))}
        {/* Duplicate for loop */}
        {items.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-4">
            <span className="font-inter font-black text-[10px] text-brand-black uppercase tracking-[0.1em]">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-black/20" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
