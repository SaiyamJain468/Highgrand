import { MessageSquare } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { markAsRead } from "./actions"

export default async function AdminInquiries({ searchParams }: { searchParams: { tab?: string } }) {
  const currentTab = searchParams.tab || "unread"

  const inquiries = await prisma.inquiry.findMany({
    where: {
      status: currentTab === "unread" ? "NEW" : undefined
    },
    orderBy: { createdAt: "desc" }
  })

  const unreadCount = await prisma.inquiry.count({ where: { status: "NEW" } })

  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Inquiries</h1>
        <p className="font-inter text-[14px] text-brand-muted mt-2">Manage incoming product inquiries and general contact form submissions.</p>
      </div>

      <div className="flex gap-8 border-b border-brand-border mb-8">
        <Link 
          href="/admin/inquiries?tab=unread" 
          className={`font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 transition-colors ${currentTab === 'unread' ? 'text-brand-accent border-brand-accent' : 'text-brand-muted border-transparent hover:text-brand-white'}`}
        >
          Unread ({unreadCount})
        </Link>
        <Link 
          href="/admin/inquiries?tab=all" 
          className={`font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 transition-colors ${currentTab === 'all' ? 'text-brand-accent border-brand-accent' : 'text-brand-muted border-transparent hover:text-brand-white'}`}
        >
          All Inquiries
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <div className="border border-brand-border border-dashed p-16 text-center bg-brand-surface1/30">
          <MessageSquare size={40} className="mx-auto text-brand-disabled mb-4" />
          <h3 className="font-inter font-medium text-[16px] text-brand-muted">Inbox Empty</h3>
          <p className="font-inter text-[13px] text-brand-disabled mt-2 mb-6">No {currentTab === 'unread' ? 'new' : ''} inquiries at the moment.</p>
        </div>
      ) : (
        <div className="bg-brand-surface1 border border-brand-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-surface2 border-b border-brand-border">
                  <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Date</th>
                  <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Contact</th>
                  <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Product</th>
                  <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Message</th>
                  <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className={`border-b border-brand-border transition-colors ${inquiry.status !== 'NEW' ? 'opacity-60 hover:bg-brand-surface2/50' : 'bg-brand-surface2/20 hover:bg-brand-surface2/80'}`}>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-muted whitespace-nowrap">
                      {inquiry.createdAt.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-inter text-[13px] text-brand-white">{inquiry.name}</p>
                      <p className="font-inter text-[11px] text-brand-muted">{inquiry.email}</p>
                      <p className="font-inter text-[11px] text-brand-muted">{inquiry.phone}</p>
                    </td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-white">
                      {inquiry.productName ? inquiry.productName : "General"}
                    </td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-muted max-w-xs truncate">
                      {inquiry.message}
                    </td>
                    <td className="py-4 px-6">
                      {inquiry.status === 'NEW' && (
                        <form action={async () => {
                          "use server"
                          await markAsRead(inquiry.id)
                        }}>
                          <button type="submit" className="text-brand-accent hover:text-brand-white font-inter text-[12px] underline underline-offset-2">Mark Read</button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
