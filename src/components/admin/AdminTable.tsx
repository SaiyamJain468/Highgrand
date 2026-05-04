import React from "react"

interface AdminTableProps {
  headers: string[]
  children: React.ReactNode
  emptyMessage?: string
}

export function AdminTable({ headers, children, emptyMessage = "No records found." }: AdminTableProps) {
  return (
    <div className="bg-brand-surface1 border border-brand-border overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-surface2/50 border-b border-brand-border">
              {headers.map((header, i) => (
                <th key={i} className="font-inter font-bold text-[11px] text-brand-muted uppercase tracking-[0.2em] py-5 px-8">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {React.Children.count(children) === 0 ? (
              <tr>
                <td colSpan={headers.length} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-surface2 flex items-center justify-center text-brand-muted">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </div>
                    <p className="font-inter text-[14px] text-brand-muted uppercase tracking-widest">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminTableRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <tr className={`border-b border-brand-border/50 hover:bg-brand-surface2/30 transition-all group ${className}`}>
      {children}
    </tr>
  )
}

export function AdminTableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`py-6 px-8 ${className}`}>
      {children}
    </td>
  )
}
