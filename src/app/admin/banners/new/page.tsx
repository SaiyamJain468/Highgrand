import { createBanner } from "../actions"
import Link from "next/link"

export default function NewBanner() {
  return (
    <div className="p-8 lg:p-12 max-w-3xl">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Upload Banner</h1>
        <Link href="/admin/banners" className="text-brand-accent hover:text-brand-white font-inter text-[13px] transition-colors mt-2 block">
          ← Back to Banners
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border p-6 md:p-8">
        <form action={createBanner} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Image URL (Desktop) *</label>
            <input name="image" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="Cloudinary URL" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Image URL (Mobile) - Optional</label>
            <input name="mobileImage" type="text" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="Cloudinary URL" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Link (Optional)</label>
            <input name="link" type="text" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="/products" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Alt Text</label>
            <input name="altText" type="text" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="E.g. Summer Collection" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Display Order</label>
              <input name="displayOrder" type="number" defaultValue="0" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div className="flex flex-col gap-2 pt-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isActive" value="true" defaultChecked className="w-4 h-4 bg-brand-black border-brand-border accent-brand-accent" />
                <span className="font-inter text-[13px] text-brand-white">Active Banner</span>
              </label>
            </div>
          </div>

          <button type="submit" className="bg-brand-white text-brand-black px-6 py-4 mt-4 font-inter text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors self-start">
            Upload Banner
          </button>
        </form>
      </div>
    </div>
  )
}
