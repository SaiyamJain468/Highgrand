"use client"

import { createCategory } from "../actions"
import Link from "next/link"
import ImageUpload from "@/components/admin/ImageUpload"
import { useState } from "react"

export default function NewCategory() {
  const [imageUrl, setImageUrl] = useState<string[]>([])

  const handleImageChange = (url: string) => {
    setImageUrl([url])
  }

  const handleImageRemove = (url: string) => {
    setImageUrl([])
  }

  return (
    <div className="p-8 lg:p-12 max-w-3xl">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">New Category</h1>
        <Link href="/admin/categories" className="text-brand-accent hover:text-brand-white font-inter text-[13px] transition-colors mt-2 block">
          ← Back to Categories
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border p-6 md:p-8">
        <form action={createCategory} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Name</label>
            <input name="name" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. Oversized T-Shirts" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Slug</label>
            <input name="slug" type="text" required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. oversized-tshirts" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Description</label>
            <textarea name="description" rows={3} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="Optional description..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Category Image</label>
            <input type="hidden" name="image" value={imageUrl[0] || ""} />
            <ImageUpload 
              value={imageUrl} 
              onChange={handleImageChange} 
              onRemove={handleImageRemove}
              maxFiles={1} 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Status</label>
              <select name="status" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors">
                <option value="ACTIVE">Active</option>
                <option value="COMING_SOON">Coming Soon</option>
                <option value="HIDDEN">Hidden</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Display Order</label>
              <input name="displayOrder" type="number" defaultValue="0" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
          </div>

          <button type="submit" className="bg-brand-white text-brand-black px-6 py-4 mt-4 font-inter text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
            Create Category
          </button>
        </form>
      </div>
    </div>
  )
}
