export default function AdminCategories() {
  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Categories</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-2">Manage product categories and organize the storefront.</p>
        </div>
        <button className="bg-brand-white text-brand-black px-6 py-3 font-inter text-[12px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors">
          + Add Category
        </button>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Name</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Slug</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Status</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                <td className="py-4 px-6 font-inter text-[13px] text-brand-white font-medium">Oversized T-Shirts</td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">oversized-tshirts</td>
                <td className="py-4 px-6">
                  <span className="bg-[#0D2010] text-brand-success text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider">Active</span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-brand-muted hover:text-brand-white font-inter text-[12px] underline underline-offset-2">Edit</button>
                </td>
              </tr>
              <tr className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                <td className="py-4 px-6 font-inter text-[13px] text-brand-white font-medium">Polo T-Shirts</td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">polo-tshirts</td>
                <td className="py-4 px-6">
                  <span className="bg-[#2A2A2A] text-brand-disabled text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider">Coming Soon</span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-brand-muted hover:text-brand-white font-inter text-[12px] underline underline-offset-2">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
