import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteCategory } from "./actions"

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' }
  })

  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Categories</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-2">Manage product categories and organize the storefront.</p>
        </div>
        <Link href="/admin/categories/new" className="bg-brand-white text-brand-black px-6 py-3 font-inter text-[12px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors block">
          + Add Category
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Image</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Name</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Slug</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Status</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-brand-muted font-inter text-[13px]">No categories found.</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                    <td className="py-4 px-6">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-10 h-10 object-cover rounded-[2px]" />
                      ) : (
                        <div className="w-10 h-10 bg-brand-surface2 rounded-[2px]" />
                      )}
                    </td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-white font-medium">{cat.name}</td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">{cat.slug}</td>
                    <td className="py-4 px-6">
                      <span className={`text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider ${
                        cat.status === 'ACTIVE' ? 'bg-[#0D2010] text-brand-success' : 
                        cat.status === 'HIDDEN' ? 'bg-red-900/30 text-red-500' : 'bg-[#2A2A2A] text-brand-disabled'
                      }`}>
                        {cat.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex items-center gap-4">
                      <Link href={`/admin/categories/${cat.id}`} className="text-brand-muted hover:text-brand-white font-inter text-[12px] underline underline-offset-2">Edit</Link>
                      <form action={async () => {
                        "use server"
                        await deleteCategory(cat.id)
                      }}>
                        <button type="submit" className="text-brand-muted hover:text-red-500 font-inter text-[12px] underline underline-offset-2">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
