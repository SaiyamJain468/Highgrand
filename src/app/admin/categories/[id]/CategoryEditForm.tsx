"use client"

import { updateCategory } from "../actions"
import Link from "next/link"
import ImageUpload from "@/components/admin/ImageUpload"
import { useState } from "react"

export default function CategoryEditForm({ category }: { category: any }) {
  const [imageUrl, setImageUrl] = useState<string[]>(category.image ? [category.image] : [])

  const handleImageChange = (url: string) => {
    setImageUrl([url])
  }

  const handleImageRemove = (url: string) => {
    setImageUrl([])
  }

  const updateAction = updateCategory.bind(null, category.id)

  return (
    <form action={updateAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Name</label>
        <input name="name" type="text" defaultValue={category.name} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. Oversized T-Shirts" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Slug</label>
        <input name="slug" type="text" defaultValue={category.slug} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="e.g. oversized-tshirts" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Description</label>
        <textarea name="description" defaultValue={category.description} rows={3} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" placeholder="Optional description..." />
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
          <select name="status" defaultValue={category.status} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors">
            <option value="ACTIVE">Active</option>
            <option value="COMING_SOON">Coming Soon</option>
            <option value="HIDDEN">Hidden</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Display Order</label>
          <input name="displayOrder" type="number" defaultValue={category.displayOrder} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
      </div>

      <button type="submit" className="bg-brand-white text-brand-black px-6 py-4 mt-4 font-inter text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
        Update Category
      </button>
    </form>
  )
}
