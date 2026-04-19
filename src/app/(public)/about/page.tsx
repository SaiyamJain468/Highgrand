"use client"

import { motion } from "framer-motion"
import SkewSection from "@/components/public/SkewSection"
import TextReveal from "@/components/public/TextReveal"
import Magnetic from "@/components/public/Magnetic"
import LegacyTimeline from "@/components/public/LegacyTimeline"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { value: "10k+", label: "SqFt Facility" },
    { value: "50+", label: "Skilled Artisans" },
    { value: "100%", label: "In-house QC" }
  ]

  return (
    <div className="bg-brand-black min-h-screen">
      {/* Hero */}
      <SkewSection>
        <div className="default-container pt-48 pb-24">
          <p className="font-inter font-semibold text-[13px] text-brand-accent uppercase tracking-[0.2em] mb-6">Our Legacy</p>
          <h1 className="font-bebas text-[72px] md:text-[140px] text-brand-white uppercase leading-[0.8] tracking-tight mb-12">
            <TextReveal staggerChildren={0.03}>CRAFTING PREMIUM</TextReveal><br/>
            <span className="text-brand-accent">SINCE 2013.</span>
          </h1>
          <p className="font-inter text-[18px] md:text-[22px] text-brand-muted max-w-[700px] leading-relaxed">
            Founded with a vision to eliminate the "Export Quality" myth and make it the Delhi standard. This is the timeline of our 10-year struggle and ultimate craftsmanship.
          </p>
        </div>
      </SkewSection>

      {/* The Master Thread Timeline */}
      <LegacyTimeline />

      {/* Story & Factory */}
      <SkewSection>
        <div className="bg-brand-surface1 border-y border-brand-border py-32 md:py-48 mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="default-container flex flex-col lg:flex-row gap-20 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-full lg:w-1/2 aspect-[4/5] bg-brand-surface2 border border-brand-border p-4 relative"
            >
              <Image 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" 
                alt="Factory" 
                fill
                className="object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-brand-accent/20 translate-x-4 translate-y-4 -z-10" />
            </motion.div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="font-bebas text-[56px] md:text-[80px] text-brand-white uppercase mb-8 leading-none">Our Factory <br/><span className="text-brand-muted">in New Delhi</span></h2>
              <p className="font-inter text-[16px] text-brand-muted leading-relaxed mb-8">
                Located in the industrial heart of the capital, our manufacturing unit houses state-of-the-art knitting, dyeing, and stitching machinery. We don't just trade apparel; we build it from the yarn up.
              </p>
              <p className="font-inter text-[16px] text-brand-muted leading-relaxed mb-12">
                Every batch of our signature 220 GSM oversized fabric goes through strict bio-washing and pre-shrinking processes to guarantee 0% shrinkage and zero color bleeding.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="block font-bebas text-[48px] text-brand-accent leading-none mb-2">{stat.value}</span>
                    <span className="font-inter text-[11px] text-brand-muted uppercase tracking-[0.2em]">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SkewSection>

      <SkewSection>
        <div className="default-container text-center py-24 mb-24 flex flex-col items-center">
          <h2 className="font-bebas text-[64px] md:text-[96px] text-brand-white uppercase mb-8 leading-none">Partner With Us</h2>
          <p className="font-inter text-[18px] text-brand-muted mb-12 max-w-[700px] leading-relaxed">
            Whether you are launching your first drop or scaling to thousands of monthly orders, our infrastructure is built to support your growth effortlessly and profitably.
          </p>
          <Magnetic>
            <Link href="/register" className="inline-block bg-brand-white text-brand-black px-14 py-5 font-inter font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-brand-accent transition-all shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              Unlock Wholesale Prices
            </Link>
          </Magnetic>
        </div>
      </SkewSection>
    </div>
  )
}
