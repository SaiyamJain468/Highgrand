"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Users, Settings, LogOut, LayoutDashboard, MessageSquare, Image as ImageIcon, Grid, ChevronRight } from "lucide-react"
import { signOut } from "next-auth/react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Grid },
    { name: "Resellers", href: "/admin/resellers", icon: Users },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Banners", href: "/admin/banners", icon: ImageIcon },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-72 border-r border-brand-border bg-brand-surface1 hidden md:flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-8 border-b border-brand-border">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-accent flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(200,169,110,0.3)] group-hover:scale-110 transition-transform">
            <Settings className="text-brand-black" size={20} />
          </div>
          <div>
            <p className="font-bebas text-[24px] text-brand-white uppercase leading-none tracking-tight">Highgrand</p>
            <p className="font-inter text-[10px] text-brand-accent uppercase font-bold tracking-[0.2em] mt-1">Admin Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 py-8 flex flex-col gap-2 px-4 overflow-y-auto custom-scrollbar">
        {navLinks.map(link => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href))
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-between group px-4 py-3.5 font-inter text-[13px] font-medium transition-all border ${isActive
                  ? "bg-brand-surface2 border-brand-border text-brand-white shadow-inner"
                  : "text-brand-muted border-transparent hover:text-brand-white hover:bg-brand-surface2/50"
                }`}
            >
              <div className="flex items-center gap-3">
                <link.icon size={18} className={isActive ? "text-brand-accent" : "text-brand-muted group-hover:text-brand-white transition-colors"} />
                {link.name}
              </div>
              {isActive && <ChevronRight size={14} className="text-brand-accent" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-brand-border flex flex-col gap-4 bg-brand-black/20">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-brand-muted hover:text-brand-error hover:bg-brand-error/5 font-inter text-[13px] font-bold uppercase tracking-widest transition-all border border-transparent hover:border-brand-error/20"
        >
          <LogOut size={18} /> Sign Out
        </button>

        <div className="text-center">
          <a href="https://github.com/SaiyamJain468" target="_blank" rel="noopener noreferrer" className="font-inter text-[9px] text-brand-muted/50 hover:text-brand-accent transition-colors block uppercase tracking-[0.3em]">
            SYSTEM BY SAIYAM JAIN
          </a>
        </div>
      </div>
    </aside>
  )
}
