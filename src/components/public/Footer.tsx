"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <footer className="bg-brand-black border-t border-brand-border pt-16 md:pt-24 pb-12 relative overflow-hidden">
      {/* Industrial Watermark */}
      <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 font-bebas text-[100px] sm:text-[150px] md:text-[300px] text-brand-white/5 leading-none select-none pointer-events-none w-screen overflow-hidden">
        HIGHGRAND
      </div>

      <div className="default-container relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-16 md:gap-12 mb-20"
        >
          <motion.div variants={item} className="col-span-2 md:col-span-4">
            <div className="font-bebas text-[36px] md:text-[48px] text-brand-white mb-6 tracking-tight">HIGH<span className="text-brand-accent">GRAND</span></div>
            <p className="font-inter text-brand-muted text-[14px] md:text-[15px] leading-relaxed mb-8 max-w-[320px]">
              Delhi's premium industrial-scale manufacturer. Crafting heavyweight blanks and luxury streetwear for the next generation of Indian brands.
            </p>
            <div className="flex gap-6">
              {[
                { name: "Instagram", url: "https://www.instagram.com/highgrand__/", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> }
              ].map((social, i) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all duration-500 group">
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-1 md:col-span-2">
            <h4 className="font-bebas text-[18px] md:text-[20px] text-brand-white uppercase tracking-widest mb-6 md:mb-8">Navigation</h4>
            <ul className="flex flex-col gap-3 md:gap-4">
              {['Home', 'Products', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-brand-muted hover:text-brand-accent text-sm font-medium transition-all flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-brand-accent group-hover:w-4 transition-all"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="col-span-1 md:col-span-3">
            <h4 className="font-bebas text-[18px] md:text-[20px] text-brand-white uppercase tracking-widest mb-6 md:mb-8">Supply Chain</h4>
            <ul className="flex flex-col gap-3 md:gap-4">
              <li><Link href="/products" className="text-brand-muted hover:text-brand-accent text-sm transition-colors">Premium Oversized</Link></li>
              <li><Link href="/products" className="text-brand-muted hover:text-brand-accent text-sm transition-colors">Acid Wash</Link></li>
              <li><Link href="/products" className="text-brand-muted hover:text-brand-accent text-sm transition-colors">Boxy Heavy</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="col-span-2 md:col-span-3">
            <h4 className="font-bebas text-[18px] md:text-[20px] text-brand-white uppercase tracking-widest mb-4 md:mb-8">Industrial HQ</h4>
            <div className="flex flex-col sm:flex-row md:flex-col gap-6 md:gap-0">
              <p className="font-inter text-brand-muted text-sm leading-relaxed mb-6">
                IX/6358, Netaji Gali<br/>
                Gandhi Nagar, Delhi 110031
              </p>
              <div className="bg-brand-surface1 border border-brand-border p-4 md:p-5 flex-1 md:flex-none">
                <span className="block font-bebas text-[11px] text-brand-accent uppercase tracking-[0.2em] mb-2">Coordinates</span>
                <span className="block font-inter text-[12px] md:text-[13px] text-brand-white tabular-nums">28.6631° N, 77.2721° E</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="pt-12 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[11px] text-brand-disabled font-inter uppercase tracking-[0.3em] font-bold">
              © 2026 HIGHGRAND MANUFACTURING INDIA
            </p>
            <p className="text-[10px] text-brand-disabled font-inter uppercase tracking-[0.2em]">
              All Industrial Rights Reserved
            </p>
          </div>
          <div className="flex gap-8">
            <span className="text-[11px] text-brand-disabled font-bold uppercase tracking-widest">GST Approved</span>
            <span className="text-[11px] text-brand-disabled font-bold uppercase tracking-widest">ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
