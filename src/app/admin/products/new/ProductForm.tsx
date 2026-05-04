"use client"

import { useState } from "react"
import { createProduct } from "../actions"
import ImageUpload from "@/components/admin/ImageUpload"

export default function ProductForm({ categories }: { categories: any[] }) {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const handleImageChange = (url: string) => {
    setImageUrls((prev) => [...prev, url])
  }

  const handleImageRemove = (url: string) => {
    setImageUrls((prev) => prev.filter((val) => val !== url))
  }

  return (
    <form action={createProduct} className="flex flex-col gap-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Name *</label>
          <input name="name" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Slug *</label>
          <input name="slug" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Category *</label>
        <select name="categoryId" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors">
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Short Description</label>
        <textarea name="shortDescription" rows={2} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Long Description</label>
        <textarea name="longDescription" rows={5} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">MRP Label</label>
          <input name="mrpLabel" type="text" required placeholder="₹850" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Wholesale Label</label>
          <input name="wholesaleLabel" type="text" required placeholder="₹420" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">MOQ Note</label>
          <input name="moqNote" type="text" required placeholder="No minimum order" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">GSM</label>
          <input name="gsm" type="number" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Composition</label>
          <input name="composition" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Weave</label>
          <input name="weave" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Finish</label>
          <input name="finish" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Wash Care</label>
        <input name="washCare" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Images</label>
        <input type="hidden" name="images" value={JSON.stringify(imageUrls)} />
        <ImageUpload 
          value={imageUrls}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
          maxFiles={10}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Sizes (JSON Array)</label>
        <input name="sizes" type="text" defaultValue='["S","M","L","XL"]' className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Colors (JSON Array)</label>
        <input name="colors" type="text" defaultValue="[]" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
      </div>

      <div className="flex items-center gap-6 mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" value="true" defaultChecked className="w-4 h-4 bg-brand-black border-brand-border accent-brand-accent" />
          <span className="font-inter text-[13px] text-brand-white">Active</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isFeatured" value="true" className="w-4 h-4 bg-brand-black border-brand-border accent-brand-accent" />
          <span className="font-inter text-[13px] text-brand-white">Featured</span>
        </label>
      </div>

      <button type="submit" className="bg-brand-white text-brand-black px-6 py-4 mt-4 font-inter text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors self-start">
        Create Product
      </button>
    </form>
  )
}
