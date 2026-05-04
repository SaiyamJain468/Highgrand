"use client"
 
import { createCategory, ActionState } from "../actions"
import Link from "next/link"
import ImageUpload from "@/components/admin/ImageUpload"
import { useState, useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
 
export default function NewCategory() {
  const [imageUrl, setImageUrl] = useState<string[]>([])
 
  const [state, formAction, isPending] = useActionState(createCategory, { success: false })

  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
    }
    if (state.success) {
      toast.success(state.message || "Category created successfully")
    }
  }, [state])

  const handleImageChange = (url: string) => {
    setImageUrl([url])
  }

  const handleImageRemove = () => {
    setImageUrl([])
  }

  return (
    <div className="p-8 lg:p-12 max-w-3xl opacity-100 data-[pending=true]:opacity-70 transition-opacity" data-pending={isPending ? "true" : "false"}>
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">New Category</h1>
        <Link href="/admin/categories" className="text-brand-accent hover:text-brand-white font-inter text-[13px] transition-colors mt-2 block">
          ← Back to Categories
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border p-6 md:p-8">
        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              disabled={isPending} 
              className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" 
              placeholder="e.g. Oversized T-Shirts" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Slug</label>
            <input 
              name="slug" 
              type="text" 
              required 
              disabled={isPending} 
              className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" 
              placeholder="e.g. oversized-tshirts" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Description</label>
            <textarea 
              name="description" 
              rows={3} 
              disabled={isPending} 
              className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" 
              placeholder="Optional description..." 
            />
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
              <select 
                name="status" 
                disabled={isPending} 
                className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50"
              >
                <option value="ACTIVE">Active</option>
                <option value="COMING_SOON">Coming Soon</option>
                <option value="HIDDEN">Hidden</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Display Order</label>
              <input 
                name="displayOrder" 
                type="number" 
                defaultValue="0" 
                disabled={isPending} 
                className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="bg-brand-white text-brand-black px-6 py-4 mt-4 font-inter text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  )
}
