export default function AdminSettings() {
  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Site Settings</h1>
        <p className="font-inter text-[14px] text-brand-muted mt-2">Manage global configurations such as the announcement bar.</p>
      </div>

      <div className="max-w-2xl bg-brand-surface1 border border-brand-border p-8">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Top Announcement Bar Text</label>
            <input 
              type="text" 
              defaultValue="NEW DROP: OVERSIZED HOODIES ARRIVING NEXT WEEK. 0% SHRINKAGE."
              className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">WhatsApp Number (inc. Country Code)</label>
            <input 
              type="text" 
              defaultValue="919876543210"
              className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent w-full"
            />
          </div>

          <div className="pt-6 border-t border-brand-border flex justify-end">
            <button type="button" className="bg-brand-white text-brand-black px-8 py-3.5 font-inter font-semibold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
