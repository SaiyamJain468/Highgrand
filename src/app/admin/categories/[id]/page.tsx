import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import CategoryEditForm from "./CategoryEditForm"
import { AdminHeader } from "@/components/admin/AdminHeader"

export default async function EditCategory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const category = await prisma.category.findUnique({
    where: { id }
  })

  if (!category) notFound()

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto">
      <AdminHeader 
        title="Collection Refactoring" 
        subtitle={`Updating structural parameters for: ${category.name}`}
        breadcrumbs={[
          { label: "Categories", href: "/admin/categories" },
          { label: "Edit Category" }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-brand-surface1 border border-brand-border p-10 shadow-2xl">
            <CategoryEditForm category={category} />
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-brand-surface1 border border-brand-border p-8 sticky top-8">
            <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight mb-4">Structure Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-brand-border/50 pb-2">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Internal ID</span>
                <span className="text-[11px] text-brand-white font-mono">{category.id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/50 pb-2">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Status</span>
                <span className="text-[11px] text-brand-accent uppercase font-bold">{category.status}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/50 pb-2">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Type</span>
                <span className="text-[11px] text-brand-white uppercase font-bold">Standard Collection</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-brand-border/50">
              <p className="font-inter text-[12px] text-brand-muted leading-relaxed">
                Reorganizing collections affects global navigation and SEO indexing. Ensure slugs are permanent to avoid broken links.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
