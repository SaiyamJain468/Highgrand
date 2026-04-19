"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const heroWord = {
  hidden: { opacity: 0, y: 56, skewY: 5 },
  visible: { 
    opacity: 1, 
    y: 0, 
    skewY: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
}

export default function Hero() {
  const headline = "QUALITY THAT SELLS ITSELF".split(" ")
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917669932444"

  return (
    <section className="relative h-screen min-h-[640px] bg-brand-black flex items-center justify-center overflow-hidden">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-black" />
        <img 
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2565&auto=format&fit=crop" 
          alt="Highgrand Factory"
          className="w-full h-full object-cover opacity-35"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 default-container w-full text-center flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-inter font-medium text-[12px] text-brand-accent uppercase tracking-[0.2em] mb-6"
        >
          DELHI'S PREMIUM APPAREL MANUFACTURER
        </motion.p>

        <motion.h1 
          className="font-bebas text-[60px] md:text-[96px] text-brand-white leading-[0.9] tracking-[-0.01em] mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.065 } }
          }}
        >
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 mr-4">
              <motion.span variants={heroWord} className="inline-block">{word}</motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="font-inter font-light text-[18px] text-brand-muted max-w-[560px] mb-8"
        >
          Wholesale oversized apparel for resellers, boutiques & online brands across India.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link 
            href="/products" 
            className="bg-brand-white text-brand-black px-9 py-3.5 font-inter font-medium text-[13px] uppercase tracking-[0.12em] hover:bg-brand-accent transition-colors duration-180"
          >
            View Collection
          </Link>
          <a  
            href={`https://wa.me/${whatsappNumber}`}
            className="bg-brand-whatsapp text-brand-black px-9 py-3.5 font-inter font-semibold text-[13px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 hover:bg-brand-success hover:text-brand-white transition-colors duration-180"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WhatsApp Us
          </a>
        </motion.div>
      </div>

      {/* Trust Strip */}
      <div className="absolute bottom-0 left-0 w-full bg-brand-black/70 backdrop-blur-sm py-3 z-10 border-t border-brand-border">
        <div className="default-container flex flex-wrap justify-center gap-x-8 gap-y-2">
          {['✓ GST Registered', '✓ 12 Yrs in Delhi', '650+ Resellers', 'No MOQ'].map((pill, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-inter font-medium text-[12px] text-brand-muted tracking-[0.05em]">{pill}</span>
              {i < 3 && <div className="hidden sm:block w-[1px] h-3 bg-brand-border" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
