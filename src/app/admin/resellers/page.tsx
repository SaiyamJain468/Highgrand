import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/AdminTable"
import { AdminBadge } from "@/components/admin/AdminBadge"
import ResellerActionButtons from "./ResellerActionButtons"
import { Briefcase, MapPin, Globe } from "lucide-react"

export default async function AdminResellers({ 
  searchParams 
}: { 
  searchParams: Promise<{ status?: string }> 
}) {
  const { status } = await searchParams
  const currentStatus = (status || "PENDING").toUpperCase()

  const users = await prisma.user.findMany({
    where: {
      status: currentStatus as any
    },
    include: {
      resellerProfile: true
    },
    orderBy: { createdAt: "desc" }
  })

  const tabs = [
    { label: "Pending Approvals", status: "PENDING" },
    { label: "Verified Partners", status: "APPROVED" },
    { label: "Rejected Applications", status: "REJECTED" },
  ]

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <AdminHeader 
        title="Wholesale Network" 
        subtitle="Manage B2B partnerships, evaluate business authenticity, and authorize reseller access."
        breadcrumbs={[{ label: "Resellers" }]}
      />

      {/* Modern Tabs */}
      <div className="flex gap-12 mb-10 border-b border-brand-border/30">
        {tabs.map((tabItem) => (
          <Link 
            key={tabItem.status}
            href={`/admin/resellers?status=${tabItem.status}`} 
            className={`font-inter text-[11px] font-bold uppercase tracking-[0.25em] pb-5 transition-all relative ${
              currentStatus === tabItem.status 
                ? 'text-brand-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-accent' 
                : 'text-brand-muted hover:text-brand-white'
            }`}
          >
            {tabItem.label}
          </Link>
        ))}
      </div>

      <AdminTable 
        headers={["Partner Profile", "Business Intelligence", "Market Data", "Account State", "Authorization"]}
        emptyMessage={`No ${currentStatus.toLowerCase()} applications found.`}
      >
        {users.map((user) => (
          <AdminTableRow key={user.id}>
            <AdminTableCell>
              <div className="flex flex-col">
                <p className="font-inter text-[15px] font-bold text-brand-white group-hover:text-brand-accent transition-colors">{user.name}</p>
                <p className="font-inter text-[12px] text-brand-muted mt-1">{user.email}</p>
                <p className="font-inter text-[11px] text-brand-accent font-bold mt-1 uppercase tracking-widest">{user.phone}</p>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-brand-muted" />
                  <span className="font-inter text-[13px] text-brand-white font-medium">{user.resellerProfile?.businessName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-brand-muted" />
                  <span className="font-inter text-[11px] text-brand-muted uppercase tracking-widest">{user.resellerProfile?.businessType || 'N/A'}</span>
                </div>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-brand-muted" />
                  <span className="font-inter text-[13px] text-brand-white">{user.resellerProfile?.city || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Monthly Volume:</span>
                  <span className="text-[11px] text-brand-accent font-bold">{user.resellerProfile?.monthlyVolume || 'N/A'}</span>
                </div>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <AdminBadge type={user.status === 'APPROVED' ? "success" : user.status === 'REJECTED' ? "error" : "warning"}>
                {user.status}
              </AdminBadge>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex items-center gap-4">
                <ResellerActionButtons userId={user.id} currentStatus={user.status as any} />
              </div>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTable>
    </div>
  )
}
