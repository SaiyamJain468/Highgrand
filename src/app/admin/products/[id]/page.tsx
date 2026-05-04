import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProductEditForm from "./ProductEditForm"
import { AdminHeader } from "@/components/admin/AdminHeader"
import Link from "next/link"

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id }
  })

  if (!product) notFound()

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto">
      <AdminHeader 
        title="Protocol Modification" 
        subtitle={`Updating technical specifications for: ${product.name}`}
        breadcrumbs={[
          { label: "Products", href: "/admin/products" },
          { label: "Edit Product" }
        ]}
        actions={
          <Link 
            href={`/products/${product.slug}`} 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-brand-surface2 border border-brand-border text-brand-accent font-inter text-[12px] font-bold uppercase tracking-widest hover:bg-brand-surface1 transition-all"
          >
            View on Site ↗
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-brand-surface1 border border-brand-border p-10 shadow-2xl">
            <ProductEditForm categories={categories} product={product} />
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-brand-surface1 border border-brand-border p-8 sticky top-8">
            <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight mb-4">Meta Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-brand-border/50 pb-2">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Internal ID</span>
                <span className="text-[11px] text-brand-white font-mono">{product.id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/50 pb-2">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Last Modified</span>
                <span className="text-[11px] text-brand-white">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/50 pb-2">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Creator</span>
                <span className="text-[11px] text-brand-accent uppercase font-bold">Admin Authority</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-brand-border/50">
              <p className="font-inter text-[12px] text-brand-muted leading-relaxed">
                Modifying this entry will trigger a global cache revalidation. Please ensure all details are accurate before deploying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
