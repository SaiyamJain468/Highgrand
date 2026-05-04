import React from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface AdminHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: { label: string; href?: string }[]
}

export function AdminHeader({ title, subtitle, actions, breadcrumbs }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        {breadcrumbs && (
          <nav className="flex items-center gap-2 mb-4">
            <Link href="/admin" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted hover:text-brand-accent transition-colors">Dashboard</Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={10} className="text-brand-border" />
                {crumb.href ? (
                  <Link href={crumb.href} className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted hover:text-brand-accent transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="font-bebas text-[56px] text-brand-white uppercase leading-none tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="font-inter text-[14px] text-brand-muted mt-3 uppercase tracking-[0.2em] font-medium max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-4 shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
