import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-border pt-16 pb-8">
      <div className="default-container grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
        <div className="col-span-1">
          <div className="font-bebas text-[32px] text-brand-white mb-4">HIGHGRAND</div>
          <p className="font-inter text-brand-muted text-sm leading-relaxed mb-6">
            Delhi's premium apparel manufacturer. Wholesale oversized T-shirts, hoodies, and more for resellers and online brands across India.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-white hover:border-brand-white transition-colors cursor-pointer">
              {/* Instagram */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-inter text-[11px] font-semibold text-brand-white uppercase tracking-widest mb-6">Products</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/products" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Oversized T-Shirts</Link></li>
            <li><Link href="/products" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Polo T-Shirts</Link></li>
            <li><Link href="/products" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Hoodies & Sweatshirts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-inter text-[11px] font-semibold text-brand-white uppercase tracking-widest mb-6">Company</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/about" className="text-brand-muted hover:text-brand-white text-sm transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Contact</Link></li>
            <li><Link href="/privacy-policy" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-inter text-[11px] font-semibold text-brand-white uppercase tracking-widest mb-6">Resellers</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/register" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Register Free</Link></li>
            <li><Link href="/login" className="text-brand-muted hover:text-brand-white text-sm transition-colors">Login to Account</Link></li>
            <li><Link href="/about#how-it-works" className="text-brand-muted hover:text-brand-white text-sm transition-colors">How it Works</Link></li>
          </ul>
        </div>
      </div>

      <div className="default-container pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-brand-disabled font-inter uppercase tracking-widest">
          © 2026 Highgrand · Delhi, India
        </p>
        <p className="text-[11px] text-brand-disabled font-inter uppercase tracking-widest">
          GST: 07XXXXXXXXXXXXX
        </p>
      </div>
    </footer>
  )
}
