import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { toggleBanner, deleteBanner } from "./actions"

export default async function AdminBanners() {
  const banners = await prisma.banner.findMany({
    orderBy: { displayOrder: "asc" }
  })

  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Hero Banners</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-2">Manage the homepage hero image loop and active status.</p>
        </div>
        <Link href="/admin/banners/new" className="bg-brand-white text-brand-black px-6 py-3 font-inter text-[12px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors block">
          + Upload Banner
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6 w-32">Preview</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Name (Alt)</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Status</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {banners.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-brand-muted font-inter text-[13px]">No banners found.</td>
                </tr>
              ) : (
                banners.map((banner) => (
                  <tr key={banner.id} className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-24 h-12 bg-brand-surface2 border border-brand-border overflow-hidden">
                        <img src={banner.image} alt={banner.altText} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-white">{banner.altText}</td>
                    <td className="py-4 px-6">
                      <span className={`text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider ${banner.isActive ? 'bg-[#0D2010] text-brand-success' : 'bg-[#2A2A2A] text-brand-disabled'}`}>
                        {banner.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex gap-4 mt-2">
                      <form action={async () => {
                        "use server"
                        await toggleBanner(banner.id, banner.isActive)
                      }}>
                        <button type="submit" className="text-brand-muted hover:text-brand-white font-inter text-[12px] underline underline-offset-2">
                          {banner.isActive ? 'Disable' : 'Enable'}
                        </button>
                      </form>
                      <form action={async () => {
                        "use server"
                        await deleteBanner(banner.id)
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
