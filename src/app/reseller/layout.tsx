import Link from "next/link"
import { ShoppingBag, Search, User, LogOut, Package } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ResellerLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  
  // Note: Middleware handles basic redirect, but checking here ensures session is typed
  if (!session) redirect("/login")

  return (
    <div className="flex h-screen bg-brand-black overflow-hidden pt-16">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-border bg-brand-surface1 hidden md:flex flex-col">
        <div className="p-6">
          <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-1">Signed in as</p>
          <p className="font-bebas text-[20px] text-brand-white truncate">{session.user.businessName || session.user.name}</p>
          <span className="inline-block mt-2 bg-[#0D2010] text-brand-success text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider">Approved Reseller</span>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-1 px-4">
          <Link href="/reseller" className="flex items-center gap-3 px-4 py-3 bg-brand-surface2 border border-brand-border text-brand-white font-inter text-[13px] font-medium transition-colors">
            <Package size={16} /> Dashboard
          </Link>
          <Link href="/products" className="flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-white hover:bg-brand-surface2 hover:border hover:border-brand-border font-inter text-[13px] font-medium border border-transparent transition-colors">
            <ShoppingBag size={16} /> Shop Catalog
          </Link>
          <Link href="/reseller/profile" className="flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-white hover:bg-brand-surface2 hover:border hover:border-brand-border font-inter text-[13px] font-medium border border-transparent transition-colors">
            <User size={16} /> My Profile
          </Link>
        </nav>

        <div className="p-4 border-t border-brand-border">
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-error hover:bg-[#1A0A0A] font-inter text-[13px] font-medium transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header logic later */}
        {children}
      </main>
    </div>
  )
}
