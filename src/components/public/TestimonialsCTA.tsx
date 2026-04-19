import Link from "next/link"

export function TestimonialCarousel() {
  // Task 27 Placeholder — Will eventually fetch from DB
  const testimonials = [
    { text: "Highgrand's oversized tees changed my entire brand's trajectory. The 220 GSM quality feels incredibly premium.", author: "Rahul M.", business: "Urban Origins", city: "Mumbai" },
    { text: "No MOQ combined with their wholesale pricing allows me to test new drops without massive upfront risk.", author: "Sneha P.", business: "The Street Edit", city: "Bangalore" },
    { text: "The fit and finish is standard. Their bio-washed cotton holds up perfectly even after 20+ washes.", author: "Arjun S.", business: "Varsity Co", city: "Delhi" },
  ]

  return (
    <section className="bg-brand-surface1 border-y border-brand-border py-24 overflow-hidden">
      <div className="default-container">
        <h2 className="font-bebas text-[40px] text-brand-white uppercase tracking-wide text-center mb-16">What Our Partners Say</h2>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
          {testimonials.map((t, idx) => (
            <div key={idx} className="min-w-[320px] md:min-w-[400px] snap-center bg-brand-surface2 border border-brand-border p-8">
              <div className="flex gap-1 mb-6 text-brand-accent">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p className="font-playfair text-[18px] text-brand-cream italic leading-relaxed mb-8">"{t.text}"</p>
              <div className="border-t border-brand-border pt-6">
                <p className="font-inter font-semibold text-[14px] text-brand-white uppercase tracking-wider">{t.author}</p>
                <p className="font-inter text-[13px] text-brand-muted mt-1">{t.business} · {t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BottomCTA() {
  // Task 28
  return (
    <section className="bg-brand-black py-32 text-center border-b border-brand-border">
      <div className="default-container max-w-[800px]">
        <h2 className="font-bebas text-[64px] md:text-[80px] leading-[0.9] text-brand-white uppercase mb-6">READY TO BECOME A RESELLER?</h2>
        <p className="font-inter text-[18px] text-brand-muted mb-10">
          Join 650+ resellers already growing their brands with Highgrand's premium wholesale apparel line.
        </p>
        <Link 
          href="/register" 
          className="inline-block bg-brand-white text-brand-black px-10 py-4 font-inter font-semibold text-[13px] uppercase tracking-[0.12em] hover:bg-brand-accent transition-colors duration-200"
        >
          Register Free Now
        </Link>
      </div>
    </section>
  )
}
