import { MessageSquare, ExternalLink } from "lucide-react"

export default function AdminInquiries() {
  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Inquiries</h1>
        <p className="font-inter text-[14px] text-brand-muted mt-2">Manage incoming product inquiries and general contact form submissions.</p>
      </div>

      <div className="flex gap-8 border-b border-brand-border mb-8">
        <button className="font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 text-brand-accent border-brand-accent transition-colors">
          Unread (0)
        </button>
        <button className="font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 text-brand-muted border-transparent hover:text-brand-white transition-colors">
          All Inquiries
        </button>
      </div>

      <div className="border border-brand-border border-dashed p-16 text-center bg-brand-surface1/30">
        <MessageSquare size={40} className="mx-auto text-brand-disabled mb-4" />
        <h3 className="font-inter font-medium text-[16px] text-brand-muted">Inbox Empty</h3>
        <p className="font-inter text-[13px] text-brand-disabled mt-2 mb-6">No new inquiries at the moment.</p>
      </div>
    </div>
  )
}
