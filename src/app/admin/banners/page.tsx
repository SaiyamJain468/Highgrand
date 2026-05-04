import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { toggleBanner, deleteBanner } from "./actions"
import DeleteButton from "./DeleteButton"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/AdminTable"
import { AdminBadge } from "@/components/admin/AdminBadge"
import { Plus, Eye, EyeOff, Monitor, Smartphone } from "lucide-react"

export default async function AdminBanners() {
  const banners = await prisma.banner.findMany({
    orderBy: { displayOrder: "asc" }
  })

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <AdminHeader 
        title="Visual Identity: Banners" 
        subtitle="Manage high-impact visual narratives, hero sequences, and marketing campaigns."
        breadcrumbs={[{ label: "Banners" }]}
        actions={
          <Link href="/admin/banners/new" className="bg-brand-white text-brand-black px-8 py-4 font-inter text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1">
            <Plus size={16} strokeWidth={3} /> Upload New Banner
          </Link>
        }
      />

      <AdminTable 
        headers={["Asset Previews", "Metadata", "Visual Priority", "Global Status", "Control"]}
        emptyMessage="No marketing banners found."
      >
        {banners.map((banner) => (
          <AdminTableRow key={banner.id}>
            <AdminTableCell>
              <div className="flex items-center gap-6">
                {/* Desktop Preview */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Monitor size={10} className="text-brand-muted" />
                    <span className="text-[9px] uppercase font-bold text-brand-muted tracking-widest">Desktop</span>
                  </div>
                  <div className="w-32 h-16 bg-brand-surface2 border border-brand-border/50 overflow-hidden group-hover:border-brand-accent transition-colors">
                    <img src={banner.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Desktop Preview" />
                  </div>
                </div>

                {/* Mobile Preview */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={10} className="text-brand-muted" />
                    <span className="text-[9px] uppercase font-bold text-brand-muted tracking-widest">Mobile</span>
                  </div>
                  <div className="w-12 h-16 bg-brand-surface2 border border-brand-border/50 overflow-hidden group-hover:border-brand-accent transition-colors">
                    <img src={banner.mobileImage || banner.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Mobile Preview" />
                  </div>
                </div>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex flex-col gap-1">
                <p className="font-inter text-[14px] font-bold text-brand-white">{banner.altText || "Untitled Banner"}</p>
                <p className="font-inter text-[11px] text-brand-muted truncate max-w-[200px]">{banner.link || "No destination link"}</p>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex flex-col">
                <p className="font-bebas text-[24px] text-brand-accent leading-none">{banner.displayOrder}</p>
                <p className="font-inter text-[9px] text-brand-muted uppercase font-bold tracking-widest mt-1">Order Sequence</p>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <AdminBadge type={banner.isActive ? "success" : "default"}>
                {banner.isActive ? "Active / Visible" : "Hidden / Inactive"}
              </AdminBadge>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex items-center gap-4">
                <form action={async () => {
                  "use server"
                  await toggleBanner(banner.id, banner.isActive)
                }}>
                  <button 
                    type="submit" 
                    className="p-2.5 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-white transition-all rounded-sm"
                    title={banner.isActive ? "Hide Banner" : "Show Banner"}
                  >
                    {banner.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </form>
                <DeleteButton id={banner.id} />
              </div>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTable>
    </div>
  )
}
