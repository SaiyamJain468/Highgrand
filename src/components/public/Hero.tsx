"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const heroWord = {
  hidden: { opacity: 0, y: 56, skewY: 5 },
  visible: { 
    opacity: 1, 
    y: 0, 
    skewY: 0,
    transition: { duration: 0.7 } 
  }
}

export default function Hero() {
  const headline = "QUALITY THAT SELLS ITSELF".split(" ")
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917669932444"

  return (
    <section className="relative h-screen min-h-[640px] bg-brand-black flex items-center justify-center overflow-hidden">
      {/* Cinematic Ken Burns Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-brand-black" 
          animate={{ background: ["#050505", "#0a0a0a", "#050505"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.img 
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2565&auto=format&fit=crop" 
          alt="Highgrand Factory"
          className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-90 mix-blend-multiply" />
        
        {/* Grain Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 default-container w-full text-center flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-inter font-medium text-[12px] text-brand-accent uppercase tracking-[0.3em] mb-6 drop-shadow-[0_0_10px_rgba(20,200,80,0.4)]"
        >
          DELHI'S FACTORY DIRECT MANUFACTURER
        </motion.p>

        <motion.h1 
          className="font-bebas text-[72px] sm:text-[96px] md:text-[120px] lg:text-[140px] text-brand-white leading-[0.85] tracking-[-0.02em] mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-4 mr-4 sm:mr-6">
              <motion.span variants={heroWord} className="inline-block hover:text-brand-accent transition-colors duration-300 drop-shadow-2xl">{word}</motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-inter font-light text-[16px] md:text-[20px] text-brand-muted max-w-[640px] mb-12 leading-relaxed"
        >
          Wholesale oversized apparel for ambitious resellers, streetwear boutiques & online brands across India.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link href="/products" passHref>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-white text-brand-black px-10 py-4 font-inter font-bold text-[13px] uppercase tracking-[0.15em] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-shadow duration-300 flex items-center justify-center cursor-pointer"
            >
              View Collection
            </motion.div>
          </Link>
          <a href={`https://wa.me/${whatsappNumber}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-black border border-brand-whatsapp text-brand-whatsapp px-10 py-4 font-inter font-bold text-[13px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-brand-whatsapp hover:text-brand-black hover:shadow-[0_0_40px_rgba(37,211,102,0.25)] transition-all duration-300 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              WhatsApp Us
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Trust Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent pt-16 pb-6 z-10 border-t border-brand-border/30"
      >
        <div className="default-container flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-4">
          {['GST Registered', '12 Yrs in Delhi', '650+ Resellers', 'No Minimums'].map((pill, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-4">
              <span className="font-bebas text-[16px] md:text-[18px] text-brand-muted tracking-[0.1em] uppercase flex items-center gap-2">
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
