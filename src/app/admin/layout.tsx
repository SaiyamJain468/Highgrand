import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "./AdminSidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") redirect("/login")

  return (
    <div className="flex min-h-screen bg-brand-black">
      {/* Sidebar - Sticky approach */}
      <AdminSidebar />

      {/* Main Content - Natural scrolling */}
      <main className="flex-1 bg-brand-black relative min-h-screen flex flex-col">
        {/* Subtle Background Elements */}
        <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-brand-accent/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-1/3 h-1/3 bg-white/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        <div className="flex-1 relative z-10">
          {children}
        </div>

        {/* System Footer Padding */}
        <div className="h-20 shrink-0 pointer-events-none" />
      </main>
    </div>
  )
}
