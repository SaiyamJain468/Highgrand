"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Magnetic from "./Magnetic"
import TextReveal from "./TextReveal"

const heroWord = {
  hidden: { opacity: 0, y: 56, skewY: 5 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.7 }
  }
}

const charVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
  }
}

export default function Hero() {
  const headline = "QUALITY THAT SELLS ITSELF"
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917669932444"

  return (
    <section className="relative h-screen min-h-[640px] bg-brand-black flex items-center justify-center overflow-hidden w-full max-w-full">
      {/* Cinematic Ken Burns Background with Mouse Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-brand-black"
          animate={{ background: ["#050505", "#0a0a0a", "#050505"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2565&auto=format&fit=crop"
            alt="Highgrand Factory"
            className="w-full h-full object-cover mix-blend-luminosity"
          />
        </motion.div>

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-90 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-20 default-container w-full text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-inter font-medium text-[10px] md:text-[12px] text-brand-accent uppercase tracking-[0.3em] mb-4 md:mb-6"
        >
          DELHI'S FACTORY DIRECT MANUFACTURER
        </motion.p>

        <h1 className="font-bebas text-[42px] sm:text-[96px] md:text-[120px] lg:text-[140px] text-brand-white leading-[0.85] tracking-tight mb-8">
          <TextReveal delay={0.8} staggerChildren={0.06}>
            {headline}
          </TextReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-inter font-light text-[14px] md:text-[20px] text-brand-muted max-w-[640px] mb-10 md:mb-12 leading-relaxed px-4 sm:px-0"
        >
          Wholesale oversized apparel for ambitious resellers, streetwear boutiques & online brands across India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto px-6 sm:px-0 items-center justify-center"
        >
          <Magnetic>
            <Link href="/products" passHref>
              <div className="bg-brand-white text-brand-black px-10 py-5 font-inter font-bold text-[12px] md:text-[13px] uppercase tracking-[0.15em] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-shadow duration-300 flex items-center justify-center cursor-pointer min-w-[220px]">
                View Collection
              </div>
            </Link>
          </Magnetic>
          <Magnetic>
            <a href={`https://wa.me/${whatsappNumber}`} className="block">
              <div className="bg-brand-black border border-brand-whatsapp text-brand-whatsapp px-10 py-5 font-inter font-bold text-[12px] md:text-[13px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-brand-whatsapp hover:text-brand-black hover:shadow-[0_0_40px_rgba(37,211,102,0.25)] transition-all duration-300 cursor-pointer min-w-[220px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                WhatsApp Us
              </div>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Trust Strip */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-black via-brand-black/95 to-transparent pt-20 pb-8 z-10 border-t border-brand-border/20"
      >
        <div className="default-container flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-3 px-4">
          {['GST Registered', '12 Yrs in Delhi', '650+ Resellers', 'No Minimums'].map((pill, i) => (
            <div key={i} className="flex items-center gap-2 md:gap-4">
              <span className="font-bebas text-[14px] md:text-[18px] text-brand-muted tracking-[0.1em] uppercase flex items-center gap-2">
                <span className="text-brand-accent glow-pulse">✦</span> {pill}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .glow-pulse {
          animation: glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from { text-shadow: 0 0 2px rgba(20, 200, 80, 0.2); }
          to { text-shadow: 0 0 12px rgba(20, 200, 80, 0.8); }
        }
      `}</style>
    </section>
  )
}
