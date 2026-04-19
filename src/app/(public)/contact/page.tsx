"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, MessageCircle, ShieldCheck } from "lucide-react"
import SkewSection from "@/components/public/SkewSection"
import TextReveal from "@/components/public/TextReveal"
import Magnetic from "@/components/public/Magnetic"

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917669932444"
  
  return (
      <div className="bg-brand-black min-h-screen pt-40 pb-24 relative overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute top-0 right-0 w-[600px] h-1 bg-brand-accent shadow-[0_0_80px_20px_rgba(200,169,110,0.2)]"></div>
        
        <div className="default-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <p className="font-inter font-semibold text-[13px] text-brand-accent uppercase tracking-[0.2em] mb-6 shadow-sm">Partner With Us</p>
            <h1 className="font-bebas text-[48px] sm:text-[72px] md:text-[140px] text-brand-white uppercase leading-[0.8] tracking-tight mb-8">
              <TextReveal staggerChildren={0.03}>LET'S BUILD YOUR</TextReveal><br/>
              <span className="text-brand-accent">LEGACY.</span>
            </h1>
            <p className="font-inter text-[16px] md:text-[22px] text-brand-muted max-w-[700px] mx-auto leading-relaxed px-4">
              India's most trusted manufacturing infrastructure. Get factory direct pricing and scale your clothing brand with industrial precision.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-20 items-start">
            {/* Left: Industrial Details */}
            <div className="w-full lg:w-[40%] flex flex-col gap-16">
              {[
                { icon: MapPin, title: "HQ & Factory", detail: "Highgrand Manufacturing\nIX/6358, Netaji Gali, Gandhi Nagar\nNew Delhi, 110031" },
                { icon: Phone, title: "Direct WhatsApp", detail: "+91 7669932444\nTUE-SUN: 09:30 - 21:00" },
                { icon: Mail, title: "Commercial Support", detail: "admin@highgrand.com" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-8 group"
                >
                  <div className="w-16 h-16 bg-[#0A0A0A] border border-brand-border/50 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-black transition-all duration-500 shadow-xl">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="font-inter font-bold text-[12px] text-brand-muted uppercase tracking-[0.2em] mb-3">{item.title}</h4>
                    <p className="font-inter text-[16px] text-brand-white leading-relaxed whitespace-pre-line">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Trust Bar */}
              <div className="pt-12 border-t border-brand-border/30 w-full">
                <span className="block font-inter text-[11px] font-bold text-brand-muted uppercase tracking-[0.3em] mb-8">Industrial Verification</span>
                <div className="grid grid-cols-2 gap-6 md:gap-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <div className="flex flex-col items-center lg:items-start gap-3">
                    <ShieldCheck className="w-8 h-8 text-brand-accent" />
                    <span className="font-bebas text-[14px] text-brand-white tracking-widest">GST VERIFIED</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start gap-3">
                    <ShieldCheck className="w-8 h-8 text-brand-accent" />
                    <span className="font-bebas text-[14px] text-brand-white tracking-widest">ISO 9001:2015</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start gap-3">
                    <ShieldCheck className="w-8 h-8 text-brand-accent" />
                    <span className="font-bebas text-[14px] text-brand-white tracking-widest">MSME REGISTERED</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start gap-3">
                    <ShieldCheck className="w-8 h-8 text-brand-accent" />
                    <span className="font-bebas text-[14px] text-brand-white tracking-widest">OEKO-TEX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Premium Form */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[60%] bg-[#080808] border border-brand-border/50 p-10 md:p-16 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700" />
              
              <h3 className="font-bebas text-[48px] text-brand-white uppercase mb-10">Direct Inquiry</h3>
              <form className="flex flex-col gap-8" onSubmit={e => { e.preventDefault(); alert("Inquiry sent successfully.") }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="font-inter font-bold text-[11px] uppercase tracking-widest text-brand-muted">Full Name</label>
                    <input type="text" required className="bg-transparent border-b border-brand-border/50 py-4 text-brand-white outline-none focus:border-brand-accent transition-colors" placeholder="ENTER YOUR NAME" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-inter font-bold text-[11px] uppercase tracking-widest text-brand-muted">Phone Number</label>
                    <input type="tel" required className="bg-transparent border-b border-brand-border/50 py-4 text-brand-white outline-none focus:border-brand-accent transition-colors" placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-inter font-bold text-[11px] uppercase tracking-widest text-brand-muted">Your Requirement</label>
                  <textarea rows={4} required className="bg-transparent border-b border-brand-border/50 py-4 text-brand-white outline-none focus:border-brand-accent transition-colors resize-none" placeholder="DESCRIBE YOUR BRAND OR ORDER VOLUME"></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 mt-6">
                  <Magnetic>
                    <button type="submit" className="flex-1 bg-brand-white text-brand-black py-6 px-12 font-inter text-[14px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-xl">
                      Send Inquiry
                    </button>
                  </Magnetic>
                  <Magnetic>
                    <a 
                      href={`https://wa.me/${whatsappNumber}`} 
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-4 bg-transparent border border-brand-whatsapp text-brand-whatsapp py-6 px-12 font-inter text-[14px] font-black uppercase tracking-widest hover:bg-brand-whatsapp hover:text-brand-black transition-all shadow-xl"
                    >
                      <MessageCircle size={24} /> WhatsApp Fast-Track
                    </a>
                  </Magnetic>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
  )
}
