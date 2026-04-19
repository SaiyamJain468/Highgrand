"use client"
import { Truck, Factory, ShieldCheck, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import BrandMarquee from "./BrandMarquee"

export default function HomeSections() {
  return (
    <>
      <section className="bg-[#030303] py-32 relative overflow-hidden border-t border-brand-border/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#1A1A1A_0%,transparent_50%)] pointer-events-none" />
        <div className="default-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-bebas text-[48px] md:text-[64px] text-brand-white uppercase tracking-tight">The Highgrand Advantage</h2>
            <p className="font-inter text-brand-muted mt-4 text-[16px] max-w-[500px] mx-auto">We eliminate the friction of apparel manufacturing so you can focus entirely on building your brand.</p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15 } 
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
          >
            {[
              { icon: <Truck size={32} />, title: 'No Minimum Order', desc: 'Order 1 piece or 10,000 pieces. We support your brand\'s growth at every stage without massive inventory pressure.' },
              { icon: <Factory size={32} />, title: 'Delhi Factory Direct', desc: 'Skip the middlemen. Get premium manufacturing quality directly from our established New Delhi facility.' },
              { icon: <Zap size={32} />, title: 'B2B Wholesale Portal', desc: 'Approved partners unlock our exclusive B2B portal, revealing live wholesale pricing and 1-click WhatsApp checkout.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any } 
                  }
                }}
                whileHover={{ y: -8 }}
                className="flex flex-col bg-[#0A0A0A] border border-brand-border/50 hover:border-brand-accent/30 rounded-[2px] p-10 lg:p-12 transition-all duration-300 relative group overflow-hidden shadow-xl"
              >
                <div className="w-20 h-20 rounded-full bg-brand-black border border-brand-border/50 flex items-center justify-center text-brand-white group-hover:bg-brand-accent group-hover:text-brand-black transition-colors duration-300 mb-8 z-10 relative shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="font-bebas text-[28px] md:text-[32px] text-brand-white uppercase mb-4 z-10 relative md:min-h-[70px] lg:min-h-0">{feature.title}</h3>
                <p className="font-inter text-brand-muted text-[14px] md:text-[15px] leading-[1.6] md:leading-[1.8] z-10 relative">
                  {feature.desc}
                </p>
                <div className="absolute top-0 right-0 p-6 md:p-8 text-brand-border/20 font-bebas text-[80px] md:text-[120px] leading-none pointer-events-none group-hover:text-brand-accent/5 transition-colors duration-500 rotate-12 -translate-y-4 md:-translate-y-8 translate-x-2 md:translate-x-4">
                  {idx + 1}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust & Heritage Section */}
      <section className="bg-brand-black py-32 relative">
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2565&auto=format&fit=crop')] bg-cover bg-center opacity-[0.15] mix-blend-luminosity grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/95 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black z-0" />

        <div className="default-container relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[55%]"
            >
              <div className="flex items-center gap-4 mb-6">
                 <ShieldCheck className="text-brand-accent" size={24} />
                 <p className="font-inter font-bold text-[13px] text-brand-accent uppercase tracking-[0.2em]">Established 2013</p>
              </div>
              <h2 className="font-bebas text-[64px] md:text-[80px] leading-[0.85] text-brand-white uppercase mb-8">12 Years of Industrial Precision</h2>
              <p className="font-inter text-brand-muted text-[16px] md:text-[18px] leading-[1.8] mb-12">
                Highgrand began with a simple mission: to provide independent apparel brands and premium boutiques with the highest quality heavyweight fabrics without the typical factory hurdles. 
                <br/><br/>
                Operating out of our core facility in New Delhi, we control every aspect of the process from premium knitting to bio-washing.
              </p>
              
              <div className="mb-12">
                <BrandMarquee />
              </div>

              <div className="flex gap-6 items-center">
                 <div className="flex -space-x-4">
                    <div className="w-12 h-12 rounded-full border-2 border-brand-black bg-[#222] z-30 overflow-hidden relative">
                      <Image src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-brand-black bg-[#333] z-20 overflow-hidden relative">
                      <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-brand-black bg-[#444] z-10 overflow-hidden relative">
                      <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                 </div>
                 <p className="font-inter text-[14px] text-brand-muted font-medium">Trusted by <span className="text-brand-white">650+ Active Brands</span> in India</p>
              </div>
            </motion.div>

            <div className="w-full lg:w-[45%] grid grid-cols-2 gap-4">
              {[
                { metric: "100%", label: "Combed Cotton", highlight: false },
                { metric: "ISO", label: "Certified Ops", highlight: true },
                { metric: "0", label: "Minimum Order", highlight: false },
                { metric: "GST", label: "Verified Invoice", highlight: false }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className={`border flex flex-col items-center justify-center p-8 lg:p-10 text-center backdrop-blur-md transition-all duration-300 ${stat.highlight ? 'bg-brand-accent border-brand-accent text-brand-black shadow-[0_0_40px_rgba(20,200,80,0.2)]' : 'bg-[#0f0f0f]/80 border-brand-border/40 text-brand-white hover:border-brand-border'}`}
                >
                  <span className={`font-bebas text-[48px] md:text-[56px] leading-none mb-2 ${stat.highlight ? 'text-brand-black' : 'text-brand-white'}`}>
                    {stat.metric}
                  </span>
                  <span className={`font-inter text-[11px] font-bold uppercase tracking-[0.15em] ${stat.highlight ? 'text-brand-black/80' : 'text-brand-muted'}`}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
