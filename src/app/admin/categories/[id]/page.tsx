import { updateCategory } from "../actions"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function EditCategory({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: params.id }
  })

  if (!category) notFound()

  // We need to bind the ID to the server action
  const updateCategoryWithId = updateCategory.bind(null, category.id)

  return (
    <div className="p-8 lg:p-12 max-w-3xl">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Edit Category</h1>
        <Link href="/admin/categories" className="text-brand-accent hover:text-brand-white font-inter text-[13px] transition-colors mt-2 block">
          ← Back to Categories
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border p-6 md:p-8">
        <form action={updateCategoryWithId} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Name</label>
            <input name="name" type="text" defaultValue={category.name} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Slug</label>
            <input name="slug" type="text" defaultValue={category.slug} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Description</label>
            <textarea name="description" rows={3} defaultValue={category.description || ''} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Image URL</label>
            <input name="image" type="text" defaultValue={category.image || ''} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            <p className="text-[11px] text-brand-muted">For now, paste the Cloudinary URL. (CldUploadWidget can be integrated here later).</p>
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
      </div>
    </div>
  )
}
