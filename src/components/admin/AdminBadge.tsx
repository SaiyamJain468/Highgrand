import React from "react"

type BadgeType = "success" | "warning" | "error" | "info" | "default"

interface AdminBadgeProps {
  children: React.ReactNode
  type?: BadgeType
  className?: string
}

export function AdminBadge({ children, type = "default", className = "" }: AdminBadgeProps) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    error: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    info: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
    default: "bg-brand-muted/10 text-brand-muted border-brand-muted/20",
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-sm border font-inter text-[10px] font-bold uppercase tracking-widest ${styles[type]} ${className}`}>
      {children}
    </span>
  )
}
