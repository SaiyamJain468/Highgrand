import { User, Shield } from "lucide-react"

export default function ResellerProfile() {
  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Account Profile</h1>
        <p className="font-inter text-[14px] text-brand-muted mt-2">Manage your business information and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Business Settings */}
        <div className="bg-brand-surface1 border border-brand-border p-8">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-brand-border">
            <User size={24} className="text-brand-accent" />
            <h2 className="font-bebas text-[28px] text-brand-white uppercase">Business Details</h2>
          </div>
          
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Brand / Company Name</label>
              <input 
                type="text" 
                defaultValue="Urban Origins"
                readOnly
                className="bg-brand-black border border-brand-border p-3 text-brand-muted cursor-not-allowed text-sm w-full"
              />
              <p className="text-[11px] text-brand-disabled mt-1">To update your legal business name, contact admin directly.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">WhatsApp Contact</label>
              <input 
                type="tel" 
                defaultValue="+91 9876543210"
                className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Default Shipping Location</label>
              <textarea 
                rows={3}
                defaultValue="Mumbai, Maharashtra"
                className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent resize-none w-full"
              ></textarea>
            </div>

            <button type="button" className="bg-brand-white text-brand-black mt-2 py-3.5 font-inter font-semibold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-colors">
              Save Changes
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-brand-surface1 border border-brand-border p-8 h-fit">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-brand-border">
            <Shield size={24} className="text-brand-accent" />
            <h2 className="font-bebas text-[28px] text-brand-white uppercase">Security</h2>
          </div>
          
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Current Password</label>
              <input 
                type="password" 
                className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">New Password</label>
              <input 
                type="password" 
                className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent w-full"
              />
            </div>
            
            <button type="button" className="border border-brand-border bg-transparent text-brand-white mt-2 py-3.5 font-inter font-semibold text-[13px] uppercase tracking-widest hover:border-brand-white transition-colors">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
