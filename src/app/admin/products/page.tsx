export default function AdminProducts() {
  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Products</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-2">Manage your catalog, edit pricing, and update stock.</p>
        </div>
        <button className="bg-brand-white text-brand-black px-6 py-3 font-inter text-[12px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors">
          + Add Product
        </button>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6 w-16">Image</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Product</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Category</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">MRP</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Wholesale</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Status</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Mock Row */}
              <tr className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-12 h-12 bg-brand-surface2 border border-brand-border overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-white font-medium">Premium Oversized T-Shirt - Black</td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">Oversized T-Shirts</td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-white">₹850</td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-accent">₹420</td>
                <td className="py-4 px-6">
                  <span className="bg-[#0D2010] text-brand-success text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider">Active</span>
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
