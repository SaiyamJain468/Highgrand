export default function AboutPage() {
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24">
      {/* Hero */}
      <div className="default-container mb-24">
        <h1 className="font-bebas text-[72px] md:text-[96px] text-brand-white uppercase leading-[0.9] tracking-tight mb-8">
          CRAFTING PREMIUM <br/><span className="text-brand-accent">SINCE 2013.</span>
        </h1>
        <p className="font-inter text-[18px] text-brand-muted max-w-[600px] leading-relaxed">
          Highgrand was founded in Delhi with a singular focus: to elevate the standard of wholesale apparel in India. We manufacture heavyweight, export-quality blanks that independent brands are proud to print on.
        </p>
      </div>

      {/* Story & Factory */}
      <div className="bg-brand-surface1 border-y border-brand-border py-24 mb-24">
        <div className="default-container flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 aspect-square bg-brand-surface2 border border-brand-border p-4">
             <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" alt="Factory" className="w-full h-full object-cover grayscale opacity-80" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-bebas text-[48px] text-brand-white uppercase mb-6">Our Factory in Delhi</h2>
            <p className="font-inter text-[15px] text-brand-muted leading-relaxed mb-6">
              Located in the industrial heart of New Delhi, our manufacturing unit houses state-of-the-art knitting, dyeing, and stitching machinery. We don't just trade apparel; we build it from the yarn up.
            </p>
            <p className="font-inter text-[15px] text-brand-muted leading-relaxed mb-8">
              Every batch of our signature 220 GSM oversized fabric goes through strict bio-washing and pre-shrinking processes to guarantee 0% shrinkage and zero color bleeding.
            </p>
            <div className="grid grid-cols-2 gap-y-6">
              <div><span className="block font-bebas text-[36px] text-brand-accent">10k+</span><span className="font-inter text-[12px] text-brand-muted uppercase tracking-widest">SqFt Facility</span></div>
              <div><span className="block font-bebas text-[36px] text-brand-accent">50+</span><span className="font-inter text-[12px] text-brand-muted uppercase tracking-widest">Skilled Artisans</span></div>
              <div><span className="block font-bebas text-[36px] text-brand-accent">100%</span><span className="font-inter text-[12px] text-brand-muted uppercase tracking-widest">In-house QC</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="default-container text-center max-w-[800px]">
        <h2 className="font-bebas text-[48px] text-brand-white uppercase mb-6">Partner With Us</h2>
        <p className="font-inter text-[16px] text-brand-muted mb-10 leading-relaxed">
          Whether you are launching your first drop or scaling to thousands of monthly orders, our infrastructure is built to support your growth effortlessly and profitably.
        </p>
        <a href="/register" className="inline-block bg-brand-white text-brand-black px-10 py-4 font-inter text-[13px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors">
          Unlock Wholesale Prices
        </a>
      </div>
    </div>
  )
}
