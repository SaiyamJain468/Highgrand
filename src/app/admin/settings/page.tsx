import { prisma } from "@/lib/prisma"
import SettingsForm from "./SettingsForm"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { ShieldCheck, Settings } from "lucide-react"

export default async function AdminSettings() {
  const settings = await prisma.siteSettings.findMany()
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto">
      <AdminHeader 
        title="Global Configuration" 
        subtitle="Fine-tune your platform's operational parameters, marketing touchpoints, and system-wide behaviors."
        breadcrumbs={[{ label: "Site Settings" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-brand-surface1 border border-brand-border p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Settings size={120} />
            </div>
            <div className="relative z-10">
              <SettingsForm settingsMap={settingsMap} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-brand-surface1 border border-brand-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-accent/10 flex items-center justify-center rounded-sm">
                <ShieldCheck className="text-brand-accent" size={20} />
              </div>
              <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight">System Authority</h3>
            </div>
            <p className="font-inter text-[13px] text-brand-muted leading-relaxed mb-6">
              These settings propagate across all client-side sessions globally. Changes are atomic and cached via LiteSpeed for performance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-brand-border/50">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Database Sync</span>
                <span className="text-[11px] text-emerald-500 font-bold uppercase tracking-widest">Active</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-brand-border/50">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Cache State</span>
                <span className="text-[11px] text-emerald-500 font-bold uppercase tracking-widest">Optimized</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest">Security Level</span>
                <span className="text-[11px] text-brand-accent font-bold uppercase tracking-widest">Admin Restricted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
