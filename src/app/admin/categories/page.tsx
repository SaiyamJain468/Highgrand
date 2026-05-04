import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteCategory } from "./actions"
import DeleteButton from "./DeleteButton"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/AdminTable"
import { AdminBadge } from "@/components/admin/AdminBadge"
import { Plus, Edit2, Grid, Layers } from "lucide-react"

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { displayOrder: 'asc' }
  })

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <AdminHeader 
        title="Collection Architect" 
        subtitle="Organize your brand hierarchy, manage collection aesthetics, and define store navigation."
        breadcrumbs={[{ label: "Categories" }]}
        actions={
          <Link href="/admin/categories/new" className="bg-brand-white text-brand-black px-8 py-4 font-inter text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1">
            <Plus size={16} strokeWidth={3} /> Create New Collection
          </Link>
        }
      />

      <AdminTable 
        headers={["Collection", "Hierarchy Details", "Inventory Impact", "Visibility", "Control"]}
        emptyMessage="No collections defined in the system."
      >
        {categories.map((cat) => (
          <AdminTableRow key={cat.id}>
            <AdminTableCell>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-brand-surface2 border border-brand-border/50 overflow-hidden shrink-0 group-hover:border-brand-accent transition-colors flex items-center justify-center">
                  {cat.image ? (
                    <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                  ) : (
                    <Grid size={24} className="text-brand-muted/20" />
                  )}
                </div>
                <div>
                  <p className="font-inter text-[15px] font-bold text-brand-white group-hover:text-brand-accent transition-colors">{cat.name}</p>
                  <p className="font-inter text-[11px] text-brand-muted uppercase tracking-widest mt-1">Order: {cat.displayOrder}</p>
                </div>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Slug:</span>
                  <span className="text-[11px] text-brand-white font-medium">/{cat.slug}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Type:</span>
                  <span className="text-[11px] text-brand-muted font-medium italic">Standard Collection</span>
                </div>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex items-center gap-3">
                <Layers className="text-brand-accent" size={16} />
                <div>
                  <p className="font-inter text-[14px] text-brand-white font-bold">{cat._count.products}</p>
                  <p className="font-inter text-[9px] text-brand-muted uppercase tracking-widest font-bold">Assigned Items</p>
                </div>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <AdminBadge type={cat.status === 'ACTIVE' ? "success" : cat.status === 'HIDDEN' ? "warning" : "default"}>
                {cat.status}
              </AdminBadge>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex items-center gap-3">
                <Link 
                  href={`/admin/categories/${cat.id}`} 
                  className="p-2.5 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-white hover:border-brand-white transition-all rounded-sm"
                  title="Edit Collection"
                >
                  <Edit2 size={16} />
                </Link>
                <DeleteButton id={cat.id} />
              </div>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTable>
    </div>
  )
}
