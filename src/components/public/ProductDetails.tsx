"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X, CheckCircle2, ShoppingBag, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ProductModularContent from "./ProductModularContent"

export default function ProductDetails({ product, isReseller, isPending }: { product: any, isReseller: boolean, isPending: boolean }) {
  const images = product.images ? JSON.parse(product.images) : []
  const colors = product.colors ? JSON.parse(product.colors) : []
  const sizes = product.sizes ? JSON.parse(product.sizes) : []
  
  const [mainImage, setMainImage] = useState(product.heroImage || images[0] || "")
  const [isHovered, setIsHovered] = useState(false)
  const [activeColor, setActiveColor] = useState(colors[0]?.name || colors[0] || "")
  const [washCareOpen, setWashCareOpen] = useState(false)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)

  const currentHero = (isHovered && product.hoverImage) ? product.hoverImage : mainImage;

  const whatsappNumber = "919053000031"
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${product.name}.`)

  // Smart color mapping for legacy strings
  const getColorHex = (c: any) => {
    if (typeof c === 'object' && c?.hex) return c.hex;
    const name = (typeof c === 'string' ? c : c?.name || "").toLowerCase();
    const colorMap: Record<string, string> = {
      black: "#000000", white: "#FFFFFF", red: "#E23E3E", blue: "#3E5BE2",
      purple: "#8A3EE2", green: "#3EE27B", yellow: "#E2D33E", orange: "#E28A3E",
      pink: "#E23EA5", navy: "#000080", charcoal: "#36454F", grey: "#808080",
      beige: "#F5F5DC", olive: "#556B2F"
    };
    return colorMap[name] || "#333333";
  };

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": images,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": "Highgrand"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": product.wholesaleLabel?.replace(/[^0-9]/g, '') || "0",
      "highPrice": product.mrpLabel?.replace(/[^0-9]/g, '') || "0",
      "offerCount": "1",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-brand-black min-h-screen text-brand-white selection:bg-brand-accent selection:text-brand-black">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="default-container pt-32 pb-24">
        
        {/* Navigation / Breadcrumb */}
        <nav className="flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.4em] text-brand-muted mb-16">
          <Link href="/products" className="hover:text-brand-accent transition-colors">Archive</Link>
          <span className="opacity-20">/</span>
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-brand-accent transition-colors">{product.category.name}</Link>
          <span className="opacity-20">/</span>
          <span className="text-brand-white font-bold">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          
          {/* Left: Premium Image Suite */}
          <div className="w-full lg:w-[62%] flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="aspect-[4/5] bg-brand-surface2 border border-brand-border overflow-hidden relative group cursor-zoom-in"
            >
              {currentHero && (
                <Image 
                  src={currentHero} 
                  alt={product.name} 
                  fill
                  priority
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-brand-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold z-10">
                Main Perspective
              </div>
            </motion.div>

            {/* Sub-gallery Grid */}
            <div className="grid grid-cols-2 gap-8">
              {images.filter((img: string) => img !== mainImage).map((img: string, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="aspect-[4/5] bg-brand-surface2 border border-brand-border overflow-hidden relative group"
                >
                  <Image 
                    src={img} 
                    alt={`detail-${idx}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors pointer-events-none z-10" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Technical Details & Purchase Path */}
          <div className="w-full lg:w-[38%]">
            <div className="lg:sticky lg:top-32 flex flex-col gap-10">
              
              {/* Identity */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-brand-accent/50" />
                  <p className="font-inter text-brand-accent uppercase tracking-[0.5em] text-[10px] font-bold">{product.category.name}</p>
                </div>
                <h1 className="font-bebas text-[64px] md:text-[84px] text-brand-white leading-[0.85] tracking-tight uppercase">
                  {product.name}
                </h1>
                <p className="font-inter text-brand-muted text-[14px] leading-relaxed max-w-sm">
                  {product.shortDescription || "A testament to industrial elegance and textile precision."}
                </p>
              </div>

              {/* Pricing & Logic */}
              <div className="bg-brand-surface1 border border-brand-border p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-[60px] rounded-full group-hover:bg-brand-accent/10 transition-colors duration-700" />
                
                {isReseller ? (
                  <div className="space-y-2 relative z-10">
                    <span className="text-[10px] text-brand-success uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                      <CheckCircle2 size={12} /> Partner Rate
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bebas text-[72px] text-brand-accent leading-none">{product.wholesaleLabel}</span>
                      <span className="text-brand-muted text-[12px] uppercase tracking-widest italic">/ UNIT</span>
                    </div>
                  </div>
                ) : isPending ? (
                  <div className="p-5 border border-brand-accent/20 bg-brand-accent/5 flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="font-inter text-[13px] font-bold text-brand-white uppercase tracking-widest">Review Pending</p>
                      <p className="text-[11px] text-brand-muted">Wholesale rates will unlock shortly.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 relative z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] text-brand-muted uppercase tracking-[0.3em] font-bold">Standard Retail</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bebas text-[60px] text-brand-white leading-none">{product.mrpLabel}</span>
                      </div>
                    </div>
                    <Link href="/login" className="flex items-center gap-2 font-inter text-[12px] text-brand-accent hover:text-white transition-all group/link">
                      <span className="underline underline-offset-4 decoration-brand-accent/30">Unlock Wholesale Pricing</span>
                      <X size={14} className="rotate-45 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Selection Grids */}
              <div className="space-y-10">
                
                {/* Tones */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-[0.3em]">Available Tones</p>
                    <span className="text-[10px] text-brand-white/40 uppercase tracking-widest">{activeColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    {colors.map((c: any) => {
                      const name = typeof c === 'object' ? c.name : c;
                      const hex = getColorHex(c);
                      const isActive = activeColor === name;
                      
                      return (
                        <button 
                          type="button"
                          key={name}
                          onClick={() => {
                            setActiveColor(name);
                            if (typeof c === 'object' && c.image) setMainImage(c.image);
                          }}
                          className="group relative flex flex-col items-center"
                        >
                          <div className={`w-11 h-11 rounded-full border-[1.5px] p-0.5 transition-all duration-500 ${isActive ? 'border-brand-accent scale-110 shadow-[0_0_25px_rgba(20,200,80,0.25)]' : 'border-transparent group-hover:border-brand-muted'}`}>
                            <div className="w-full h-full rounded-full border border-white/10" style={{ backgroundColor: hex }} />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Sizing */}
                <div className="space-y-6 border-t border-brand-border pt-10">
                  <div className="flex items-center justify-between">
                    <p className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-[0.3em]">Precision Fit</p>
                    <button type="button" className="text-[10px] text-brand-accent uppercase tracking-widest hover:text-white transition-colors">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {sizes.map((s: string) => (
                      <button type="button" key={s} className="h-12 border border-brand-border flex items-center justify-center font-inter text-[13px] hover:border-brand-accent hover:text-brand-accent transition-all group relative overflow-hidden">
                        <span className="relative z-10">{s}</span>
                        <div className="absolute inset-0 bg-brand-accent/5 translate-y-full group-hover:translate-y-0 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Path */}
              <div className="flex flex-col gap-4 mt-4">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  className="group flex items-center justify-center gap-3 bg-brand-whatsapp text-white py-5 font-inter text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-brand-success transition-all shadow-xl"
                >
                  <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" />
                  Request via WhatsApp
                </a>
                <button 
                  type="button"
                  onClick={() => setInquiryModalOpen(true)}
                  className="flex items-center justify-center gap-3 border border-brand-white text-brand-white py-5 font-inter text-[13px] font-medium uppercase tracking-[0.2em] hover:bg-brand-white hover:text-brand-black transition-all"
                >
                  <ShoppingBag size={18} />
                  Bulk Procurement Inquiry
                </button>
              </div>

              {/* Industrial Specs */}
              <div className="mt-12 p-8 bg-brand-surface2/40 border border-brand-border relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />
                <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <span className="block text-[9px] text-brand-muted uppercase tracking-[0.3em] font-bold mb-2">Textile Density</span>
                    <span className="block text-brand-white font-inter text-[15px] font-semibold">{product.gsm} GSM</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-brand-muted uppercase tracking-[0.3em] font-bold mb-2">Composition</span>
                    <span className="block text-brand-white font-inter text-[15px] font-semibold">{product.composition}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-brand-muted uppercase tracking-[0.3em] font-bold mb-2">Weave Style</span>
                    <span className="block text-brand-white font-inter text-[15px] font-semibold">{product.weave}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-brand-muted uppercase tracking-[0.3em] font-bold mb-2">Surface Finish</span>
                    <span className="block text-brand-white font-inter text-[15px] font-semibold">{product.finish}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modular Sections */}
      <ProductModularContent blocksJson={product.customContent} />

      {/* Modal & Overlays */}
      <AnimatePresence>
        {inquiryModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
              onClick={() => setInquiryModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-brand-surface1 border border-brand-border z-[101] p-12 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 blur-[80px] -mr-24 -mt-24" />
              <button type="button" className="absolute top-6 right-6 text-brand-muted hover:text-white transition-colors" onClick={() => setInquiryModalOpen(false)}><X size={24} /></button>
              
              <h3 className="font-bebas text-[42px] text-brand-white uppercase leading-none mb-2">Bulk Inquiry</h3>
              <p className="font-inter text-[12px] text-brand-muted uppercase tracking-[0.3em] mb-10 border-l-2 border-brand-accent pl-4">Direct Procurement Desk</p>
              
              <form className="flex flex-col gap-6 relative z-10" onSubmit={e => { e.preventDefault(); alert("Inquiry submitted!"); setInquiryModalOpen(false) }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-muted">Your Name</label>
                    <input type="text" required className="bg-brand-black border border-brand-border p-4 text-white text-sm focus:border-brand-accent outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-muted">Phone Number</label>
                    <input type="tel" required className="bg-brand-black border border-brand-border p-4 text-white text-sm focus:border-brand-accent outline-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-muted">Subject Product</label>
                  <input type="text" readOnly value={product.name} className="bg-brand-surface2 border border-brand-border p-4 text-brand-muted text-sm outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-muted">Procurement Details</label>
                  <textarea rows={4} placeholder="Quantities, timeline, customization needs..." className="bg-brand-black border border-brand-border p-4 text-white text-sm focus:border-brand-accent outline-none resize-none"></textarea>
                </div>
                <button type="submit" className="mt-4 bg-brand-white text-brand-black py-5 font-inter text-[13px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-colors">Submit Request</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
