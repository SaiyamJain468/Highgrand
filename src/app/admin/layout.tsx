import Link from "next/link"
import { Package, Search, Users, Settings, LogOut, LayoutDashboard, MessageSquare, Image as ImageIcon, Grid } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") redirect("/login")

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
    <div className="flex h-screen bg-brand-black overflow-hidden pt-16">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-border bg-brand-surface1 hidden md:flex flex-col">
        <div className="p-6 border-b border-brand-border">
          <p className="font-bebas text-[24px] text-brand-accent uppercase truncate">Admin Portal</p>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-1 px-4 overflow-y-auto">
          {navLinks.map(link => (
             <Link key={link.name} href={link.href} className="flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-white hover:bg-brand-surface2 hover:border hover:border-brand-border font-inter text-[13px] font-medium border border-transparent transition-colors">
               <link.icon size={16} /> {link.name}
             </Link>
          ))}
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
      <main className="flex-1 overflow-y-auto bg-brand-black">
        {children}
      </main>
    </div>
  )
}
