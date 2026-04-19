"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function TestimonialCarousel() {
  const testimonials = [
    { text: "Highgrand's oversized tees changed my entire brand's trajectory. 220 GSM quality feels incredibly premium.", author: "Rahul Malhotra", business: "Urban Origins", city: "Mumbai" },
    { text: "No MOQ combined with their wholesale pricing allows me to test drops without massive upfront risk.", author: "Sneha Patel", business: "The Street Edit", city: "Bangalore" },
    { text: "Fit and finish is world-standard. Bio-washed cotton holds up perfectly even after 20+ washes.", author: "Arjun Sharma", business: "Varsity Co", city: "Delhi" },
    { text: "My customers noticed the upgrade in fabric quality instantly. Worth every penny for quality.", author: "Karan Tiwari", business: "Hype Beast", city: "Pune" },
    { text: "Finally a reliable blank supplier in India that actually stands by their manufacturing times.", author: "Ananya Iyer", business: "Void Wear", city: "Ahmedabad" },
    { text: "The acid wash collection is unbelievable. Sold out within 2 hours of my drop.", author: "Vikram Singh", business: "Raw Culture", city: "Chandigarh" },
    { text: "Best oversized fit in the market. True boxy silhouette that customers actually want.", author: "Meera Das", business: "Aesthetic Era", city: "Kolkata" },
    { text: "Highgrand handles all our bulk requirements with 100% consistency in dyeing.", author: "Zaid Khan", business: "Minimalist Lab", city: "Hyderabad" },
    { text: "Switching to Highgrand reduced our return rate due to fabric quality by 90%.", author: "Aditi Rao", business: "Purity Apparel", city: "Chennai" },
    { text: "Wholesale prices are very competitive given the 240 GSM heavyweights they offer.", author: "Rohan Varma", business: "Hustle Co", city: "Jaipur" },
    { text: "Their customer support on the reseller portal is lightning fast. 10/10 service.", author: "Ishani Paul", business: "Modern Tribe", city: "Indore" },
    { text: "The fabric hand-feel is superior to any other blank supplier we've used in 5 years.", author: "Devansh G.", business: "Origin Blanks", city: "Surat" },
  ]

  // Create a triple-length array to ensure the "at least 50" feel and gapless marquee
  const items = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="bg-[#050505] border-y border-brand-border py-40 overflow-hidden relative">
      {/* Deep Background Glows */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[140px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-success/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="default-container relative z-10 mb-20 text-center flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-inter font-semibold text-[13px] text-brand-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-4"
        >
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-accent"></span>
          Reseller Network
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-accent"></span>
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-bebas text-[72px] md:text-[100px] leading-[0.85] text-brand-white uppercase tracking-tight"
        >
          The Engine Behind<br/><span className="text-brand-muted">650+ Brands</span>
        </motion.h2>
      </div>
      
      {/* Infinite scrolling marquee using Framer Motion */}
      <div className="flex relative z-10 py-10 overflow-hidden">
        <motion.div 
          className="flex gap-8 whitespace-nowrap min-w-max px-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            ease: "linear", 
            duration: 80, // Slower for readability across 50 cards
            repeat: Infinity 
          }}
        >
          {items.map((t, idx) => (
            <div 
              key={idx} 
              className="w-[380px] md:w-[420px] shrink-0 bg-brand-black/40 backdrop-blur-3xl border border-brand-border/30 rounded-[2px] p-10 md:p-12 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
            >
              {/* Giant watermark quotation */}
              <div className="absolute -top-10 -right-4 font-bebas text-[280px] leading-none text-brand-white/5 pointer-events-none group-hover:text-brand-accent/10 transition-all duration-700">
                 "
              </div>

              <div>
                <div className="flex gap-1.5 mb-8 text-brand-accent drop-shadow-[0_0_8px_rgba(20,200,80,0.4)]">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="font-playfair text-[20px] md:text-[22px] text-brand-cream italic leading-[1.6] mb-12 relative z-10 whitespace-normal">"{t.text}"</p>
              </div>
              
              <div className="flex items-center gap-4 relative z-10 border-t border-brand-border/20 pt-6">
                <div className="flex-1">
                  <p className="font-bebas text-[20px] text-brand-white uppercase tracking-wider">{t.business}</p>
                  <p className="font-inter text-[11px] text-brand-disabled uppercase tracking-widest mt-1 font-bold">{t.author} · {t.city}</p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/0 via-transparent to-brand-accent/0 group-hover:from-brand-accent/5 pointer-events-none transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function BottomCTA() {
  return (
    <section className="bg-brand-black relative py-32 md:py-48 border-b border-brand-border overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2565&auto=format&fit=crop')] bg-cover bg-center md:bg-fixed opacity-[0.08] mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/80 to-brand-black z-0"></div>

      <div className="default-container relative z-10 text-center max-w-[800px] w-full px-4 overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-bebas text-[54px] sm:text-[80px] md:text-[120px] leading-[0.85] text-brand-white uppercase mb-8 tracking-tight drop-shadow-2xl break-words"
        >
          READY TO BECOME<br/>A RESELLER?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-inter text-[18px] md:text-[20px] text-brand-muted mb-14 max-w-[640px] mx-auto leading-relaxed"
        >
          Join 650+ resellers across India scaling their fashion brands with Highgrand's premium zero-MOQ wholesale apparel line.
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
        >
          <Link href="/register" passHref>
             <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block bg-brand-white text-brand-black px-14 py-5 font-inter font-bold text-[15px] uppercase tracking-[0.15em] cursor-pointer hover:bg-brand-accent hover:text-brand-black shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(20,200,80,0.4)] transition-all duration-300"
             >
               Register Free Now
             </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
