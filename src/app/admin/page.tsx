import { Users, Package, Clock, MessageSquare, TrendingUp, ArrowUpRight, Activity, Plus, Image as ImageIcon, Settings } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function AdminDashboard() {
  const [
    pendingResellersCount,
    activeProductsCount,
    newInquiriesCount,
    totalCategoriesCount,
    recentPendingResellers,
    recentInquiries
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'RESELLER', status: 'PENDING' } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
    prisma.category.count(),
    prisma.user.findMany({
      where: { role: 'RESELLER', status: 'PENDING' },
      include: { resellerProfile: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ])

  const stats = [
    { label: "Pending Approvals", value: pendingResellersCount, icon: Users, color: "text-brand-accent", bg: "bg-brand-accent/10", href: "/admin/resellers" },
    { label: "Active Products", value: activeProductsCount, icon: Package, color: "text-brand-white", bg: "bg-white/5", href: "/admin/products" },
    { label: "New Inquiries", value: newInquiriesCount, icon: MessageSquare, color: "text-brand-accent", bg: "bg-brand-accent/5", href: "/admin/inquiries" },
    { label: "Total Categories", value: totalCategoriesCount, icon: Activity, color: "text-brand-muted", bg: "bg-brand-muted/5", href: "/admin/categories" },
  ]

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-bebas text-[56px] text-brand-white uppercase leading-none tracking-tight">Executive Dashboard</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-3 uppercase tracking-[0.2em] font-medium">Platform overview & critical actions</p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-brand-muted font-inter text-[12px] uppercase tracking-widest border border-brand-border px-4 py-2 bg-brand-surface1">
          <Clock size={14} className="text-brand-accent" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className="group bg-brand-surface1 border border-brand-border p-8 hover:border-brand-accent transition-all relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform`} />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                <p className={`font-bebas text-[48px] ${stat.color} leading-none`}>{stat.value}</p>
              </div>
              <stat.icon className={`${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} size={32} />
            </div>
            <div className="mt-6 flex items-center gap-1 text-[10px] font-inter font-bold text-brand-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              Manage Section <ArrowUpRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-8 bg-brand-surface1 border border-brand-border flex flex-col">
          <div className="p-8 border-b border-brand-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-brand-accent" size={20} />
              <h2 className="font-bebas text-[28px] text-brand-white uppercase tracking-tight">Recent Applications</h2>
            </div>
            <Link href="/admin/resellers" className="font-inter text-[11px] font-bold text-brand-accent hover:text-brand-white uppercase tracking-widest transition-colors">View All Applications</Link>
          </div>
          <div className="flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {recentPendingResellers.length === 0 ? (
                    <tr>
                      <td className="py-12 text-center text-brand-muted font-inter text-[13px]">No pending applications found.</td>
                    </tr>
                  ) : (
                    recentPendingResellers.map((reseller) => (
                      <tr key={reseller.id} className="border-b border-brand-border/50 last:border-0 hover:bg-brand-surface2/30 transition-colors group">
                        <td className="py-6 px-8">
                          <p className="font-inter text-[14px] font-bold text-brand-white group-hover:text-brand-accent transition-colors">{reseller.name}</p>
                          <p className="font-inter text-[12px] text-brand-muted mt-1">{reseller.resellerProfile?.businessName || 'Business Name N/A'}</p>
                        </td>
                        <td className="py-6 px-8 font-inter text-[12px] text-brand-muted text-right">
                          <Link href="/admin/resellers" className="text-brand-accent hover:underline uppercase tracking-widest text-[10px] font-bold">Review Application</Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions & Status */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-surface1 border border-brand-border p-8">
            <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <ArrowUpRight className="text-brand-accent" size={20} /> Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin/products/new" className="flex items-center justify-between p-4 bg-brand-surface2 border border-brand-border hover:border-brand-accent transition-all group">
                <span className="font-inter text-[11px] font-bold text-brand-muted group-hover:text-brand-white uppercase tracking-widest">New Product Entry</span>
                <Plus size={14} className="text-brand-accent" />
              </Link>
              <Link href="/admin/banners/new" className="flex items-center justify-between p-4 bg-brand-surface2 border border-brand-border hover:border-brand-accent transition-all group">
                <span className="font-inter text-[11px] font-bold text-brand-muted group-hover:text-brand-white uppercase tracking-widest">Deploy Campaign Banner</span>
                <ImageIcon size={14} className="text-brand-accent" />
              </Link>
              <Link href="/admin/settings" className="flex items-center justify-between p-4 bg-brand-surface2 border border-brand-border hover:border-brand-accent transition-all group">
                <span className="font-inter text-[11px] font-bold text-brand-muted group-hover:text-brand-white uppercase tracking-widest">Global Sync Settings</span>
                <Settings size={14} className="text-brand-accent" />
              </Link>
            </div>
          </div>

          <div className="bg-brand-surface1 border border-brand-border p-8">
            <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight mb-6 flex items-center gap-2">
              <Activity className="text-brand-accent" size={20} /> System Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[11px] font-inter uppercase tracking-widest">
                <span className="text-brand-muted font-bold">API Performance</span>
                <span className="text-emerald-500 font-black">99.9%</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-inter uppercase tracking-widest">
                <span className="text-brand-muted font-bold">Database State</span>
                <span className="text-emerald-500 font-black">Optimized</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-inter uppercase tracking-widest">
                <span className="text-brand-muted font-bold">Reseller Sync</span>
                <span className="text-brand-accent font-black">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Inquiries Full Width */}
        <div className="lg:col-span-12 bg-brand-surface1 border border-brand-border flex flex-col">
          <div className="p-8 border-b border-brand-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-brand-accent" size={20} />
              <h2 className="font-bebas text-[28px] text-brand-white uppercase tracking-tight">Latest Inquiries</h2>
            </div>
            <Link href="/admin/inquiries" className="font-inter text-[11px] font-bold text-brand-accent hover:text-brand-white uppercase tracking-widest transition-colors">Go to Inbox</Link>
          </div>
          <div className="flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {recentInquiries.length === 0 ? (
                    <tr>
                      <td className="py-12 text-center text-brand-muted font-inter text-[13px]">No inquiries found.</td>
                    </tr>
                  ) : (
                    recentInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b border-brand-border/50 last:border-0 hover:bg-brand-surface2/30 transition-colors group">
                        <td className="py-6 px-8">
                          <p className="font-inter text-[14px] font-bold text-brand-white group-hover:text-brand-accent">{inquiry.name}</p>
                          <p className="font-inter text-[11px] text-brand-muted mt-1 uppercase tracking-widest font-bold">{inquiry.email}</p>
                        </td>
                        <td className="py-6 px-8 font-inter text-[12px] text-brand-muted italic truncate max-w-[500px]">
                          "{inquiry.message}"
                        </td>
                        <td className="py-6 px-8 font-inter text-[11px] text-brand-muted text-right font-bold uppercase tracking-widest">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
