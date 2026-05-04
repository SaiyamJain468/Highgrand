"use client"

import { useTransition } from "react"
import { approveReseller, rejectReseller } from "./actions"
import { Check, X, Loader2 } from "lucide-react"

interface Props {
  userId: string
  currentStatus: "PENDING" | "APPROVED" | "REJECTED"
}

export function ResellerActionButtons({ userId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleApprove = () => {
    if (confirm("Authorize this reseller? This will grant access to wholesale pricing and send a confirmation email.")) {
      startTransition(async () => {
        await approveReseller(userId)
      })
    }
  }

  const handleReject = () => {
    if (confirm("Deny this application? The user will be notified of the rejection.")) {
      startTransition(async () => {
        await rejectReseller(userId)
      })
    }
  }

  if (currentStatus === "APPROVED") {
    return (
      <button 
        disabled={isPending}
        onClick={handleReject}
        className="flex items-center gap-2 px-4 py-2 border border-brand-border text-brand-muted hover:border-brand-error hover:text-brand-error font-inter text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
      >
        {isPending ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
        Revoke Access
      </button>
    )
  }

  if (currentStatus === "REJECTED") {
    return (
      <button 
        disabled={isPending}
        onClick={handleApprove}
        className="flex items-center gap-2 px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-brand-black font-inter text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
      >
        {isPending ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
        Re-Approve
      </button>
    )
  }

  return (
    <div className="flex gap-3">
      <button 
        disabled={isPending}
        onClick={handleApprove}
        className="flex items-center gap-2 px-4 py-2 bg-brand-white text-brand-black hover:bg-brand-accent font-inter text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm shadow-lg shadow-brand-accent/5"
      >
        {isPending ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} strokeWidth={3} />}
        Authorize
      </button>
      <button 
        disabled={isPending}
        onClick={handleReject}
        className="flex items-center gap-2 px-4 py-2 border border-brand-border text-brand-muted hover:border-brand-error hover:text-brand-error font-inter text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
      >
        {isPending ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
        Deny
      </button>
    </div>
  )
}
