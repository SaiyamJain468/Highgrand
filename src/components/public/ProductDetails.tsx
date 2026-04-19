"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, CheckCircle2 } from "lucide-react"

export default function ProductDetails({ product, isReseller, isPending }: { product: any, isReseller: boolean, isPending: boolean }) {
  const images = product.images ? JSON.parse(product.images) : ["https://via.placeholder.com/600x800"]
  const sizes = product.sizes ? JSON.parse(product.sizes) : []
  const colors = product.colors ? JSON.parse(product.colors) : []

  const [mainImage, setMainImage] = useState(images[0])
  const [activeColor, setActiveColor] = useState(colors[0]?.name)
  const [washCareOpen, setWashCareOpen] = useState(false)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917669932444"
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${product.name}.`)

  return (
    <div className="default-container py-24">
      {/* Breadcrumb */}
      <div className="font-inter text-[12px] text-brand-muted uppercase tracking-widest mb-8">
        <Link href="/products" className="hover:text-brand-white">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-brand-white">{product.category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-brand-white">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-[50%] flex flex-col md:flex-row-reverse gap-4">
          <div className="w-full aspect-[3/4] bg-brand-surface2 border border-brand-border">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-[100px] hide-scrollbar">
            {images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-20 md:w-full aspect-[3/4] border ${mainImage === img ? 'border-brand-accent' : 'border-brand-border opacity-60 hover:opacity-100'} transition-all`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-[50%] flex flex-col">
          <h1 className="font-bebas text-[48px] md:text-[56px] text-brand-white uppercase leading-[0.95] tracking-tight">{product.name}</h1>
          <p className="font-inter text-[15px] text-brand-muted mt-6 leading-relaxed mb-8">{product.longDescription}</p>

          {/* Pricing Block */}
          <div className="bg-brand-surface1 border border-brand-border p-6 mb-8">
            {isReseller ? (
              <div className="flex items-center gap-4">
                <span className="font-bebas text-[48px] text-brand-accent leading-none">{product.wholesaleLabel}</span>
                <span className="bg-[#0D2010] text-[11px] text-brand-success px-2 py-1 font-inter font-semibold uppercase tracking-wider">Reseller Price</span>
              </div>
            ) : isPending ? (
              <div className="flex items-center gap-3 p-4 bg-brand-accentSurface border border-brand-accentDark/30">
                <span className="text-brand-accent"><CheckCircle2 size={20} /></span>
                <p className="font-inter text-[13px] text-brand-cream">Your reseller account is under review (24-48 hrs).</p>
              </div>
            ) : (
              <div>
                <p className="font-inter font-semibold text-[20px] text-brand-white mb-2">MRP: {product.mrpLabel}</p>
                <p className="font-inter text-[13px] text-brand-muted flex items-center gap-2">
                  🔒 <Link href="/login" className="hover:text-brand-white underline underline-offset-4 decoration-brand-border">Login to unlock reseller pricing</Link>
                </p>
                <Link href="/register" className="inline-block mt-4 font-inter text-[12px] text-brand-accent uppercase tracking-widest font-medium hover:text-brand-white">Register Free →</Link>
              </div>
            )}
          </div>

          {/* Fabric Spec Card */}
          <div className="border border-brand-border mb-8">
            <div className="grid grid-cols-2 text-[13px] font-inter">
              <div className="p-4 border-r border-b border-brand-border"><span className="text-brand-muted uppercase tracking-wider block mb-1 text-[10px]">GSM</span><span className="text-brand-white font-medium">{product.gsm}</span></div>
              <div className="p-4 border-b border-brand-border"><span className="text-brand-muted uppercase tracking-wider block mb-1 text-[10px]">Composition</span><span className="text-brand-white font-medium">{product.composition}</span></div>
              <div className="p-4 border-r border-brand-border"><span className="text-brand-muted uppercase tracking-wider block mb-1 text-[10px]">Weave</span><span className="text-brand-white font-medium">{product.weave}</span></div>
              <div className="p-4 border-brand-border"><span className="text-brand-muted uppercase tracking-wider block mb-1 text-[10px]">Finish</span><span className="text-brand-white font-medium">{product.finish}</span></div>
            </div>
            <div className="p-4 border-t border-brand-border bg-brand-surface1 text-center">
              <span className="text-[12px] text-brand-muted">{product.moqNote}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-10">
            {/* Colors */}
            <div>
              <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-3">Colors Available</p>
              <div className="flex gap-3">
                {colors.map((c: any) => (
                  <button 
                    key={c.name}
                    title={c.name}
                    onClick={() => {
                      setActiveColor(c.name)
                      if (c.image) setMainImage(c.image)
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${activeColor === c.name ? 'border-brand-accent scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-3">Sizes Available</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s: string) => (
                  <span key={s} className="min-w-[40px] px-3 py-2 text-center bg-brand-surface2 border border-brand-border text-brand-white font-inter text-[13px] font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Wash Care Accordion */}
          <div className="border-y border-brand-border mb-10">
            <button 
              onClick={() => setWashCareOpen(!washCareOpen)}
              className="w-full flex justify-between items-center py-4 font-inter text-[13px] font-semibold uppercase tracking-widest text-brand-white"
            >
              Wash Care Instructions
              <ChevronDown className={`transition-transform ${washCareOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {washCareOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="font-inter text-[14px] text-brand-muted pb-6 leading-relaxed">
                    {product.washCare}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sticky bottom-4 z-30 sm:static sm:z-auto bg-brand-black sm:bg-transparent pt-4 sm:pt-0">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              className="flex-1 bg-brand-whatsapp text-white py-4 font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-center hover:bg-brand-success transition-colors rounded-none"
            >
              WhatsApp to Order
            </a>
            <button 
              onClick={() => setInquiryModalOpen(true)}
              className="sm:w-[200px] border border-brand-white text-brand-white py-4 font-inter text-[13px] font-medium uppercase tracking-[0.1em] text-center hover:bg-brand-white hover:text-brand-black transition-colors"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setInquiryModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-brand-surface1 border border-brand-border z-50 p-8"
            >
              <button className="absolute top-4 right-4 text-brand-muted hover:text-white" onClick={() => setInquiryModalOpen(false)}><X size={24} /></button>
              <h3 className="font-bebas text-[32px] text-brand-white uppercase mb-6">Bulk Inquiry</h3>
              <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); alert("Inquiry submitted!"); setInquiryModalOpen(false) }}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Name</label>
                  <input type="text" required className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Phone Number</label>
                  <input type="tel" required className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Product</label>
                  <input type="text" readOnly value={product.name} className="bg-brand-surface2 border border-brand-border p-3 text-brand-muted text-sm outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Message</label>
                  <textarea rows={3} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent resize-none"></textarea>
                </div>
                <button type="submit" className="mt-4 bg-brand-white text-brand-black py-4 font-inter text-[13px] font-semibold uppercase tracking-widest">Submit Inquiry</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
