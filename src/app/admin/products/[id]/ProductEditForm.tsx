"use client"

import { useState, useActionState, useEffect } from "react"
import { updateProduct, ActionState } from "../actions"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import ImageUpload from "@/components/admin/ImageUpload"
import ProductContentBuilder from "@/components/admin/ProductContentBuilder"

export default function ProductEditForm({ categories, product }: { categories: any[], product: any }) {
  const [imageUrls, setImageUrls] = useState<string[]>(
    product.images ? JSON.parse(product.images) : []
  )
  const [heroImageUrl, setHeroImageUrl] = useState<string>(product.heroImage || "")
  const [hoverImageUrl, setHoverImageUrl] = useState<string>(product.hoverImage || "")
  const [sizes, setSizes] = useState<string[]>(
    product.sizes ? JSON.parse(product.sizes) : ["S", "M", "L", "XL", "XXL"]
  )
  const [colors, setColors] = useState<{name: string, hex: string}[]>(() => {
    if (!product.colors) return []
    try {
      const parsed = JSON.parse(product.colors)
      return parsed.map((c: any) => {
        if (typeof c === 'string') {
          const colorMap: Record<string, string> = {
            black: "#000000", white: "#FFFFFF", red: "#E23E3E", blue: "#3E5BE2",
            purple: "#8A3EE2", green: "#3EE27B", yellow: "#E2D33E", orange: "#E28A3E",
            pink: "#E23EA5", navy: "#000080", charcoal: "#36454F"
          };
          return { name: c, hex: colorMap[c.toLowerCase()] || "#333333" }
        }
        return c
      })
    } catch (e) {
      return []
    }
  })
  const [newSize, setNewSize] = useState("")
  const [newColorName, setNewColorName] = useState("")
  const [newColorHex, setNewColorHex] = useState("#000000")

  const updateActionWrapper = (prevState: ActionState, formData: FormData) => updateProduct(prevState, product.id, formData)
  const [state, formAction, isPending] = useActionState(updateActionWrapper, { success: false })

  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
    }
    if (state.success) {
      toast.success(state.message || "Product updated successfully")
    }
  }, [state])

  const handleImageChange = (url: string) => {
    setImageUrls((prev) => [...prev, url])
  }

  const handleImageRemove = (url: string) => {
    setImageUrls((prev) => prev.filter((val) => val !== url))
  }

  const addSize = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSize.trim()) {
      e.preventDefault()
      if (!sizes.includes(newSize.trim())) {
        setSizes([...sizes, newSize.trim()])
      }
      setNewSize("")
    }
  }

  const removeSize = (size: string) => {
    setSizes(sizes.filter(s => s !== size))
  }

  const addColor = (e?: React.KeyboardEvent) => {
    if (e && e.key !== 'Enter') return
    if (e) e.preventDefault()
    
    if (newColorName.trim()) {
      if (!colors.find(c => c.name === newColorName.trim())) {
        setColors([...colors, { name: newColorName.trim(), hex: newColorHex }])
      }
      setNewColorName("")
    }
  }

  const removeColor = (name: string) => {
    setColors(colors.filter(c => c.name !== name))
  }


  return (
    <form action={formAction} className="flex flex-col gap-8 opacity-100 data-[pending=true]:opacity-70 transition-opacity" data-pending={isPending}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Name *</label>
          <input name="name" type="text" defaultValue={product.name} required disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Slug *</label>
          <input name="slug" type="text" defaultValue={product.slug} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Category *</label>
        <select name="categoryId" defaultValue={product.categoryId} required disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50">
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Short Description</label>
        <textarea name="shortDescription" defaultValue={product.shortDescription} rows={2} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Long Description</label>
        <textarea name="longDescription" defaultValue={product.longDescription} rows={5} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">MRP Label *</label>
          <input name="mrpLabel" type="text" defaultValue={product.mrpLabel} required disabled={isPending} placeholder="₹850" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Wholesale Label *</label>
          <input name="wholesaleLabel" type="text" defaultValue={product.wholesaleLabel} required disabled={isPending} placeholder="₹420" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">MOQ Note</label>
          <input name="moqNote" type="text" defaultValue={product.moqNote} disabled={isPending} placeholder="e.g. 50 pcs" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">GSM</label>
          <input name="gsm" type="number" defaultValue={product.gsm} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Composition (Optional)</label>
          <input name="composition" type="text" defaultValue={product.composition} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Weave (Optional)</label>
          <input name="weave" type="text" defaultValue={product.weave} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Finish (Optional)</label>
          <input name="finish" type="text" defaultValue={product.finish} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Wash Care</label>
        <input name="washCare" type="text" defaultValue={product.washCare} disabled={isPending} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-brand-surface1 border border-brand-accent/20">
        <div className="flex flex-col gap-4">
          <label className="font-bebas text-[24px] text-brand-accent tracking-widest uppercase">Hero Banner Image</label>
          <p className="text-[11px] text-brand-muted -mt-3 italic">This is the "Crazy" main image shown at the top of the product page.</p>
          <input type="hidden" name="heroImage" value={heroImageUrl} />
          <ImageUpload 
            value={heroImageUrl ? [heroImageUrl] : []}
            onChange={(url) => setHeroImageUrl(url)}
            onRemove={() => setHeroImageUrl("")}
            maxFiles={1}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bebas text-[24px] text-brand-accent tracking-widest uppercase">Secondary Reveal Image</label>
          <p className="text-[11px] text-brand-muted -mt-3 italic">This appears when the user hovers or scrolls over the banner.</p>
          <input type="hidden" name="hoverImage" value={hoverImageUrl} />
          <ImageUpload 
            value={hoverImageUrl ? [hoverImageUrl] : []}
            onChange={(url) => setHoverImageUrl(url)}
            onRemove={() => setHoverImageUrl("")}
            maxFiles={1}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Gallery Images</label>
        <input type="hidden" name="images" value={JSON.stringify(imageUrls)} />
        <ImageUpload 
          value={imageUrls}
          onChange={handleImageChange}
          onRemove={handleImageRemove}
          maxFiles={10}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Size Picker */}
        <div className="flex flex-col gap-3">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Available Sizes</label>
          <div className="flex flex-wrap gap-2 p-3 bg-brand-surface1 border border-brand-border min-h-[50px]">
            {sizes.map(size => (
              <span key={size} className="flex items-center gap-2 bg-brand-black border border-brand-border px-3 py-1 text-brand-white text-[12px] font-inter">
                {size}
                <button type="button" onClick={() => removeSize(size)} disabled={isPending} className="text-brand-error hover:text-white disabled:opacity-50">×</button>
              </span>
            ))}
            <input 
              type="text" 
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              onKeyDown={addSize}
              disabled={isPending}
              placeholder="Add size..." 
              className="bg-transparent border-none outline-none text-brand-white text-[12px] font-inter w-24 disabled:opacity-50"
            />
          </div>
          <input type="hidden" name="sizes" value={JSON.stringify(sizes)} />
          <p className="text-[10px] text-brand-muted">Press Enter to add a size</p>
        </div>

        {/* Colors */}
        <div className="flex flex-col gap-3">
          <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Available Colors</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {colors.map(c => (
              <span key={c.name} className="flex items-center gap-2 bg-brand-surface1 border border-brand-border px-3 py-1.5 text-brand-white text-[12px] font-inter">
                <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                {c.name}
                <button type="button" onClick={() => removeColor(c.name)} disabled={isPending} className="text-brand-muted hover:text-red-500 ml-1 disabled:opacity-50">×</button>
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative group">
              <input 
                type="color" 
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                disabled={isPending}
                className="w-10 h-10 bg-transparent border border-brand-border cursor-pointer p-1 rounded-none disabled:opacity-50"
                title="Manually pick circle color"
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-brand-white text-brand-black text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-bold">Manual Color</div>
            </div>
            <input 
              type="text" 
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              onKeyDown={addColor}
              disabled={isPending}
              placeholder="Color name (e.g. Jet Black)..." 
              className="flex-1 bg-brand-black border border-brand-border p-2 text-brand-white text-[13px] font-inter focus:border-brand-accent outline-none disabled:opacity-50"
            />
            <button 
              type="button" 
              onClick={() => addColor()}
              disabled={isPending}
              className="bg-brand-surface2 border border-brand-border px-4 text-brand-white text-[12px] hover:bg-brand-accent hover:text-brand-black transition-all disabled:opacity-50"
            >
              Add
            </button>
          </div>
          <input type="hidden" name="colors" value={JSON.stringify(colors)} />
          <p className="text-[10px] text-brand-muted italic">Smart Detection will work for standard names, or pick a color manually above.</p>
        </div>
      </div>

      <div className="border-t border-brand-border pt-10">
        <ProductContentBuilder 
          initialValue={product.customContent} 
          onChange={() => {}} 
        />
      </div>

      <div className="flex items-center gap-6 mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" value="true" defaultChecked={product.isActive} disabled={isPending} className="w-4 h-4 bg-brand-black border-brand-border accent-brand-accent disabled:opacity-50" />
          <span className="font-inter text-[13px] text-brand-white">Active</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isFeatured" value="true" defaultChecked={product.isFeatured} disabled={isPending} className="w-4 h-4 bg-brand-black border-brand-border accent-brand-accent disabled:opacity-50" />
          <span className="font-inter text-[13px] text-brand-white">Featured</span>
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="bg-brand-white text-brand-black px-6 py-4 mt-4 font-inter text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors self-start flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Updating...
          </>
        ) : "Update Product"}
      </button>
    </form>
  )
}
