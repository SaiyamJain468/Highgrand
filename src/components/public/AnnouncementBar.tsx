"use client"

import { motion } from "framer-motion"

export default function AnnouncementBar() {
  // Hardcoded for now. Phase 6 specifies pulling this from SiteSettings from DB.
  // We can fetch it client-side or pass via layout context later.
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917669932444"
  const text = `FREE SAMPLES FOR NEW RESELLERS · CALL NOW: +${whatsappNumber} · 650+ ACTIVE RESELLERS ACROSS INDIA`
  
  return (
    <div className="bg-brand-accent text-brand-black py-2 overflow-hidden whitespace-nowrap relative z-50">
      <motion.div 
        className="inline-block font-inter font-medium text-xs tracking-wider"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        <span className="pr-10">{text}</span>
        <span className="pr-10">{text}</span>
        <span className="pr-10">{text}</span>
        <span className="pr-10">{text}</span>
      </motion.div>
    </div>
  )
}
