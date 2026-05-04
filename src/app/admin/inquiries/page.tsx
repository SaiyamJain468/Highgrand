import { MessageSquare, Calendar, Phone, Mail, Box, Trash2, CheckCircle2 } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { markAsRead } from "./actions"
import DeleteButton from "./DeleteButton"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { AdminTable, AdminTableRow, AdminTableCell } from "@/components/admin/AdminTable"
import { AdminBadge } from "@/components/admin/AdminBadge"

export default async function AdminInquiries({ 
  searchParams 
}: { 
  searchParams: Promise<{ tab?: string }> 
}) {
  const { tab } = await searchParams
  const currentTab = (tab || "unread").toLowerCase()

  const inquiries = await prisma.inquiry.findMany({
    where: {
      status: currentTab === "unread" ? "NEW" : undefined
    },
    orderBy: { createdAt: "desc" }
  })

  const unreadCount = await prisma.inquiry.count({ where: { status: "NEW" } })

  const tabs = [
    { label: "New Inquiries", tab: "unread", count: unreadCount },
    { label: "Communication Archive", tab: "all" },
  ]

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <AdminHeader 
        title="Command Center: Inbox" 
        subtitle="Process direct customer inquiries, handle product-specific questions, and manage lead conversions."
        breadcrumbs={[{ label: "Inquiries" }]}
      />

      {/* Modern Tabs with Counters */}
      <div className="flex gap-12 mb-10 border-b border-brand-border/30">
        {tabs.map((tabItem) => (
          <Link 
            key={tabItem.tab}
            href={`/admin/inquiries?tab=${tabItem.tab}`} 
            className={`font-inter text-[11px] font-bold uppercase tracking-[0.25em] pb-5 transition-all relative flex items-center gap-3 ${
              currentTab === tabItem.tab 
                ? 'text-brand-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-accent' 
                : 'text-brand-muted hover:text-brand-white'
            }`}
          >
            {tabItem.label}
            {tabItem.count !== undefined && tabItem.count > 0 && (
              <span className="bg-brand-accent text-brand-black text-[9px] px-1.5 py-0.5 rounded-full font-black">
                {tabItem.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      <AdminTable 
        headers={["Engagement Metadata", "Client Intelligence", "Context", "Engagement State", "Operational Control"]}
        emptyMessage={`The ${currentTab} inbox is currently clear.`}
      >
        {inquiries.map((inquiry) => (
          <AdminTableRow key={inquiry.id} className={inquiry.status === 'NEW' ? "!bg-brand-accent/[0.02]" : "opacity-60"}>
            <AdminTableCell>
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-brand-muted" />
                <span className="font-inter text-[13px] text-brand-white font-medium">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-inter text-[15px] font-bold text-brand-white">{inquiry.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                    <Mail size={12} /> {inquiry.email}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-brand-accent font-bold">
                    <Phone size={12} /> {inquiry.phone}
                  </div>
                </div>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex flex-col gap-3 max-w-sm">
                <div className="flex items-center gap-2">
                  <Box size={14} className="text-brand-accent" />
                  <span className="font-inter text-[11px] font-bold text-brand-white uppercase tracking-widest">
                    {inquiry.productName ? inquiry.productName : "GENERAL INQUIRY"}
                  </span>
                </div>
                <p className="font-inter text-[13px] text-brand-muted leading-relaxed line-clamp-2 italic">
                  "{inquiry.message}"
                </p>
              </div>
            </AdminTableCell>

            <AdminTableCell>
              <AdminBadge type={inquiry.status === 'NEW' ? "info" : "default"}>
                {inquiry.status === 'NEW' ? "Active / Unread" : "Processed"}
              </AdminBadge>
            </AdminTableCell>

            <AdminTableCell>
              <div className="flex items-center gap-4">
                {inquiry.status === 'NEW' && (
                  <form action={async () => {
                    "use server"
                    await markAsRead(inquiry.id)
                  }}>
                    <button 
                      type="submit" 
                      className="p-2.5 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-brand-black transition-all rounded-sm"
                      title="Mark as Processed"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  </form>
                )}
                <a 
                  href={`https://wa.me/${inquiry.phone?.replace(/[^0-9]/g, '')}`} 
                  target="_blank"
                  className="p-2.5 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all rounded-sm"
                  title="Reply via WhatsApp"
                >
                  <MessageSquare size={16} />
                </a>
                <DeleteButton id={inquiry.id} />
              </div>
            </AdminTableCell>
          </AdminTableRow>
        ))}
      </AdminTable>
    </div>
  )
}
