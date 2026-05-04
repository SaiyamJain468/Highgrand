import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteProduct } from "./actions"
import DeleteButton from "./DeleteButton"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/AdminTable"
import { AdminBadge } from "@/components/admin/AdminBadge"
import { Plus, ExternalLink, Edit2, Package } from "lucide-react"

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <AdminHeader 
        title="Product Inventory" 
        subtitle="Manage your global catalog, update pricing architectures, and control product visibility."
        breadcrumbs={[{ label: "Products" }]}
        actions={
          <Link href="/admin/products/new" className="bg-brand-white text-brand-black px-8 py-4 font-inter text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1">
            <Plus size={16} strokeWidth={3} /> Create New Product
          </Link>
        }
      />

      <AdminTable 
        headers={["Details", "Inventory Metadata", "Pricing Structure", "Visibility", "Control"]}
        emptyMessage="Your inventory is currently empty."
      >
        {products.map((product) => {
          let firstImage = ""
          try {
            const parsed = JSON.parse(product.images)
            if (Array.isArray(parsed) && parsed.length > 0) firstImage = parsed[0]
          } catch (e) {}

          return (
            <AdminTableRow key={product.id}>
              <AdminTableCell>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-20 bg-brand-surface2 border border-brand-border/50 overflow-hidden shrink-0 group-hover:border-brand-accent transition-colors">
                    {firstImage ? (
                      <img src={firstImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-muted/20">
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-inter text-[15px] font-bold text-brand-white group-hover:text-brand-accent transition-colors">{product.name}</p>
                    <p className="font-inter text-[11px] text-brand-muted uppercase tracking-widest mt-1">{product.slug}</p>
                  </div>
                </div>
              </AdminTableCell>
              
              <AdminTableCell>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Category:</span>
                    <AdminBadge type="info" className="!px-1.5 !py-0.5">{product.category?.name || "Uncategorized"}</AdminBadge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Added:</span>
                    <span className="text-[11px] text-brand-white font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </AdminTableCell>

              <AdminTableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest w-12">Retail</span>
                    <span className="text-[14px] text-brand-white font-bold">{product.mrpLabel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-brand-accent uppercase font-bold tracking-widest w-12">Wholesale</span>
                    <span className="text-[14px] text-brand-accent font-bold">{product.wholesaleLabel}</span>
                  </div>
                </div>
              </AdminTableCell>

              <AdminTableCell>
                <AdminBadge type={product.isActive ? "success" : "default"}>
                  {product.isActive ? "Live" : "Draft / Inactive"}
                </AdminBadge>
              </AdminTableCell>

              <AdminTableCell>
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/admin/products/${product.id}`} 
                    className="p-2.5 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-white transition-all rounded-sm"
                    title="Edit Product"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <Link 
                    href={`/products/${product.slug}`} 
                    target="_blank"
                    className="p-2.5 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all rounded-sm"
                    title="View on Site"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <DeleteButton id={product.id} />
                </div>
              </AdminTableCell>
            </AdminTableRow>
          )
        })}
      </AdminTable>
    </div>
  )
}
