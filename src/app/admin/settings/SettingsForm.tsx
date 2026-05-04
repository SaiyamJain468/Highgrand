"use client"

import { useTransition } from "react"
import { saveSettings } from "./actions"
import { Save, Loader2, Info } from "lucide-react"

export default function SettingsForm({ settingsMap }: { settingsMap: Record<string, string> }) {
  const [isPending, startTransition] = useTransition()

  return (
    <form action={(formData) => {
      startTransition(async () => {
        await saveSettings(formData)
        alert("System parameters updated successfully.")
      })
    }} className="flex flex-col gap-10">
      
      <div className="space-y-8">
        {/* Marketing Segment */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1 h-4 bg-brand-accent block" />
            <h4 className="font-bebas text-[20px] text-brand-white uppercase tracking-[0.1em]">Brand & Marketing</h4>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="font-inter font-bold text-[11px] uppercase tracking-[0.2em] text-brand-muted">Top Announcement Text</label>
                <div className="group relative">
                  <Info size={12} className="text-brand-muted cursor-help" />
                  <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-brand-surface2 border border-brand-border text-[10px] text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 uppercase tracking-widest">
                    Displayed at the absolute top of every page.
                  </div>
                </div>
              </div>
              <input 
                type="text" 
                name="announcementText"
                defaultValue={settingsMap["announcementText"] || "NEW DROP: OVERSIZED HOODIES ARRIVING NEXT WEEK. 0% SHRINKAGE."}
                className="bg-brand-black border border-brand-border p-4 text-white font-inter text-sm outline-none focus:border-brand-accent transition-all hover:bg-brand-black/50"
                placeholder="Enter ticker text..."
              />
            </div>
          </div>
        </section>

        {/* Communication Segment */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1 h-4 bg-brand-accent block" />
            <h4 className="font-bebas text-[20px] text-brand-white uppercase tracking-[0.1em]">Global Communication</h4>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-3">
              <label className="font-inter font-bold text-[11px] uppercase tracking-[0.2em] text-brand-muted">Primary Support WhatsApp</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="whatsappNumber"
                  defaultValue={settingsMap["whatsappNumber"] || "917669932444"}
                  className="bg-brand-black border border-brand-border p-4 pl-12 text-white font-inter text-sm outline-none focus:border-brand-accent transition-all w-full hover:bg-brand-black/50"
                  placeholder="e.g. 917669932444"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted text-[12px] font-bold">+</div>
              </div>
              <p className="text-[10px] text-brand-muted/50 uppercase font-bold tracking-widest">Used for direct WhatsApp buttons & inquiry replies.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-10 border-t border-brand-border/30 flex justify-end">
        <button 
          disabled={isPending}
          type="submit" 
          className="group relative bg-brand-white text-brand-black px-12 py-5 font-inter font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-brand-accent transition-all flex items-center gap-3 disabled:opacity-50 overflow-hidden"
        >
          {isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} className="group-hover:scale-110 transition-transform" />
          )}
          <span>{isPending ? "Updating Infrastructure..." : "Deploy Changes"}</span>
          
          {/* Subtle button effect */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
        </button>
      </div>
    </form>
  )
}
