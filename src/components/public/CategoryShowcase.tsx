"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function CategoryShowcase() {
  const categories = [
    { id: '1', name: 'Oversized Tees', slug: 'oversized-tshirts', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop', badge: 'Explore' },
    { id: '2', name: 'Polo T-Shirts', slug: 'polo-tshirts', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=600&auto=format&fit=crop', badge: 'Ready to Ship' },
    { id: '3', name: 'Premium Hoodies', slug: 'hoodies', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=600&auto=format&fit=crop', badge: 'Ready to Ship' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any } 
    }
  }

  return (
    <section className="bg-brand-black py-24 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#111_0%,transparent_70%)] opacity-50" />
      
      <div className="default-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-20 gap-6 text-center md:text-left">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <p className="font-inter font-semibold text-[11px] md:text-[13px] text-brand-accent uppercase tracking-[0.2em] mb-4">Manufacturer Range</p>
            <h2 className="font-bebas text-[64px] md:text-[100px] leading-[0.85] text-brand-white uppercase">Our Blanks<br/><span className="text-brand-muted">Library</span></h2>
          </motion.div>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="font-inter text-[15px] md:text-[18px] text-brand-muted max-w-[400px] leading-relaxed"
          >
            Premium apparel manufacturing at factory-direct pricing. Zero MOQ for registered resellers across India.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.a 
              key={category.id}
              href={`/category/${category.slug}`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group block relative aspect-[16/10] md:aspect-[3/4] overflow-hidden bg-brand-black border border-brand-border hover:border-brand-accent/50 transition-colors duration-500 rounded-[2px]"
            >
              <Image 
                src={category.image} 
                alt={category.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="h-[1px] w-8 bg-brand-accent transform origin-left transition-all duration-500 group-hover:w-12"></div>
                   <span className="font-inter text-[10px] md:text-[11px] font-bold text-brand-accent uppercase tracking-widest">{category.badge}</span>
                </div>
                <h3 className="font-bebas text-[36px] md:text-[48px] text-brand-white leading-none mb-2">{category.name}</h3>
                <p className="font-inter text-[12px] md:text-[13px] text-brand-muted flex items-center gap-2">
                  Shop Collection
                  <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </p>
              </div>

              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <div className="px-3 py-1 md:px-4 md:py-1.5 backdrop-blur-md rounded-full border border-brand-success/30 bg-brand-success/10 text-brand-success font-inter text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  Verified
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
