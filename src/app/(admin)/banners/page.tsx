export default function AdminBanners() {
  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Hero Banners</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-2">Manage the homepage hero image loop and active status.</p>
        </div>
        <button className="bg-brand-white text-brand-black px-6 py-3 font-inter text-[12px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors">
          + Upload Banner
        </button>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6 w-32">Preview</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Name</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Status</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-24 h-12 bg-brand-surface2 border border-brand-border overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-white">Factory Main Webp</td>
                <td className="py-4 px-6">
                  <span className="bg-[#0D2010] text-brand-success text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider">Active</span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-brand-error hover:text-red-400 font-inter text-[12px] underline underline-offset-2">Disable</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
