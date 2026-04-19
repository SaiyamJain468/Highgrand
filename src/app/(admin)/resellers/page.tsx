export default function AdminResellers() {
  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Reseller Management</h1>
        <p className="font-inter text-[14px] text-brand-muted mt-2">Approve pending applications and manage active reseller profiles.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-brand-border mb-8">
        <button className="font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 text-brand-accent border-brand-accent transition-colors">
          Pending Approvals
        </button>
        <button className="font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 text-brand-muted border-transparent hover:text-brand-white transition-colors">
          Active Resellers
        </button>
        <button className="font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 text-brand-muted border-transparent hover:text-brand-white transition-colors">
          Rejected
        </button>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Date</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Applicant</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Business</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Volume</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">Oct 24, 2026</td>
                <td className="py-4 px-6">
                  <p className="font-inter text-[13px] text-brand-white">Rahul Mehta</p>
                  <p className="font-inter text-[11px] text-brand-muted">rahul@example.com</p>
                </td>
                <td className="py-4 px-6">
                  <p className="font-inter text-[13px] text-brand-white">Urban Origins</p>
                  <p className="font-inter text-[11px] text-brand-muted">Mumbai (SHOP)</p>
                </td>
                <td className="py-4 px-6 font-inter text-[13px] text-brand-white">100-500/mo</td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button className="bg-brand-white text-brand-black px-3 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-wider hover:bg-brand-success hover:text-white transition-colors">
                      Approve
                    </button>
                    <button className="border border-brand-border text-brand-muted px-3 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-wider hover:border-brand-error hover:text-brand-error transition-colors">
                      Deny
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
