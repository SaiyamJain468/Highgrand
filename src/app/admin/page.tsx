import { Users, Package, Clock } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const pendingResellersCount = await prisma.user.count({
    where: { role: 'RESELLER', status: 'PENDING' }
  })
  
  const activeProductsCount = await prisma.product.count({
    where: { isActive: true }
  })
  
  const newInquiriesCount = await prisma.inquiry.count({
    where: { status: 'NEW' }
  })

  const recentPendingResellers = await prisma.user.findMany({
    where: { role: 'RESELLER', status: 'PENDING' },
    include: { resellerProfile: true },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Admin Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-brand-surface1 border border-brand-border p-6 border-l-2 border-l-brand-accent flex items-start justify-between">
          <div>
            <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-4">Pending Resellers</p>
            <p className="font-bebas text-[40px] text-brand-white">{pendingResellersCount}</p>
          </div>
          <Users className="text-brand-accent" size={32} />
        </div>
        <div className="bg-brand-surface1 border border-brand-border p-6 flex items-start justify-between">
          <div>
            <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-4">Active Products</p>
            <p className="font-bebas text-[40px] text-brand-white">{activeProductsCount}</p>
          </div>
          <Package className="text-brand-muted" size={32} />
        </div>
        <div className="bg-brand-surface1 border border-brand-border p-6 flex items-start justify-between">
          <div>
            <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-4">New Inquiries</p>
            <p className="font-bebas text-[40px] text-brand-white">{newInquiriesCount}</p>
          </div>
          <Clock className="text-brand-muted" size={32} />
        </div>
      </div>

      {/* Recent Reseller Applications */}
      <div className="bg-brand-surface1 border border-brand-border mb-12">
        <div className="p-6 border-b border-brand-border flex justify-between items-center">
          <h2 className="font-bebas text-[24px] text-brand-white uppercase">Pending Approvals</h2>
          <a href="/admin/resellers" className="font-inter text-[12px] text-brand-accent hover:text-brand-white">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Name</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Business</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Location</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentPendingResellers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-brand-muted font-inter text-[13px]">No pending applications.</td>
                </tr>
              ) : (
                recentPendingResellers.map((reseller) => (
                  <tr key={reseller.id} className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-white">{reseller.name}</td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-white">
                      {reseller.resellerProfile?.businessName} ({reseller.resellerProfile?.businessType})
                    </td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">
                      {reseller.resellerProfile?.city}, {reseller.resellerProfile?.state}
                    </td>
                    <td className="py-4 px-6">
                      <a href={`/admin/resellers`} className="bg-brand-white text-brand-black px-4 py-2 font-inter text-[11px] font-semibold uppercase tracking-wider hover:bg-brand-success hover:text-white transition-colors inline-block text-center">
                        Review
                      </a>
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
