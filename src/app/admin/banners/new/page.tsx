"use client"

import { createBanner } from "../actions"
import ImageUpload from "@/components/admin/ImageUpload"
import { useState } from "react"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { Upload, Info } from "lucide-react"

export default function NewBanner() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [mobileImageUrls, setMobileImageUrls] = useState<string[]>([])

  const handleImageChange = (url: string) => setImageUrls([url])
  const handleImageRemove = () => setImageUrls([])

  const handleMobileImageChange = (url: string) => setMobileImageUrls([url])
  const handleMobileImageRemove = () => setMobileImageUrls([])

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto">
      <AdminHeader 
        title="Asset Acquisition" 
        subtitle="Deploy high-resolution visual anchors for the homepage hero carousel."
        breadcrumbs={[
          { label: "Banners", href: "/admin/banners" },
          { label: "New Banner" }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-brand-surface1 border border-brand-border p-10 shadow-2xl">
            <form action={createBanner} className="flex flex-col gap-10">
              
              <div className="space-y-10">
                {/* Visual Assets */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-4 bg-brand-accent block" />
                    <h4 className="font-bebas text-[20px] text-brand-white uppercase tracking-[0.1em]">Visual Assets</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="font-inter font-bold text-[11px] uppercase tracking-[0.2em] text-brand-muted">Desktop Master *</label>
                      <input type="hidden" name="image" value={imageUrls[0] || ""} />
                      <ImageUpload 
                        value={imageUrls}
                        onChange={handleImageChange}
                        onRemove={handleImageRemove}
                        maxFiles={1}
                      />
                      <p className="text-[9px] text-brand-muted uppercase font-bold tracking-widest mt-1">Recommended: 1920x800px</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="font-inter font-bold text-[11px] uppercase tracking-[0.2em] text-brand-muted">Mobile Variant (Optional)</label>
                      <input type="hidden" name="mobileImage" value={mobileImageUrls[0] || ""} />
                      <ImageUpload 
                        value={mobileImageUrls}
                        onChange={handleMobileImageChange}
                        onRemove={handleMobileImageRemove}
                        maxFiles={1}
                      />
                      <p className="text-[9px] text-brand-muted uppercase font-bold tracking-widest mt-1">Recommended: 1080x1920px</p>
                    </div>
                  </div>
                </section>

                {/* Narrative & Control */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1 h-4 bg-brand-accent block" />
                    <h4 className="font-bebas text-[20px] text-brand-white uppercase tracking-[0.1em]">Narrative & Control</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="font-inter font-bold text-[11px] uppercase tracking-[0.2em] text-brand-muted">Alt Description *</label>
                      <input name="altText" type="text" required className="bg-brand-black border border-brand-border p-4 text-white font-inter text-sm outline-none focus:border-brand-accent transition-all hover:bg-brand-black/50" placeholder="e.g. Summer Collection 2024" />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="font-inter font-bold text-[11px] uppercase tracking-[0.2em] text-brand-muted">Call to Action Link</label>
                      <input name="link" type="text" className="bg-brand-black border border-brand-border p-4 text-white font-inter text-sm outline-none focus:border-brand-accent transition-all hover:bg-brand-black/50" placeholder="e.g. /products/new-arrivals" />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="font-inter font-bold text-[11px] uppercase tracking-[0.2em] text-brand-muted">Sequence Order</label>
                      <input name="displayOrder" type="number" defaultValue="0" className="bg-brand-black border border-brand-border p-4 text-white font-inter text-sm outline-none focus:border-brand-accent transition-all hover:bg-brand-black/50" />
                    </div>

                    <div className="flex flex-col gap-3 justify-center">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-10 h-6">
                          <input type="checkbox" name="isActive" value="true" defaultChecked className="sr-only peer" />
                          <div className="w-10 h-6 bg-brand-surface2 border border-brand-border peer-checked:bg-brand-accent peer-checked:border-brand-accent transition-all" />
                          <div className="absolute left-1 top-1 w-4 h-4 bg-brand-muted peer-checked:bg-brand-black peer-checked:translate-x-4 transition-all" />
                        </div>
                        <span className="font-inter text-[11px] font-bold text-brand-white uppercase tracking-widest group-hover:text-brand-accent transition-colors">Immediate Deployment</span>
                      </label>
                    </div>
                  </div>
                </section>
              </div>

              <div className="pt-10 border-t border-brand-border/30">
                <button type="submit" className="group relative bg-brand-white text-brand-black px-12 py-5 font-inter font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-brand-accent transition-all flex items-center gap-3 overflow-hidden shadow-2xl">
                  <Upload size={16} className="group-hover:-translate-y-1 transition-transform" />
                  <span>Execute Upload</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-brand-surface1 border border-brand-border p-8 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <Info className="text-brand-accent" size={20} />
              <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight">Tech Specs</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-inter text-[10px] text-brand-muted uppercase font-bold tracking-widest mb-2">Aspect Ratio</p>
                <p className="font-inter text-[13px] text-brand-white leading-relaxed">
                  Maintain a 21:9 ratio for desktop to avoid distortion on widescreen displays.
                </p>
              </div>
              <div>
                <p className="font-inter text-[10px] text-brand-muted uppercase font-bold tracking-widest mb-2">Compression</p>
                <p className="font-inter text-[13px] text-brand-white leading-relaxed">
                  Assets are automatically optimized via Cloudinary, but please ensure source files are under 2MB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
