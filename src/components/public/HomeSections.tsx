import { Truck, Factory, Unlock } from "lucide-react"

export default function HomeSections() {
  return (
    <>
      {/* Task 24: Why Partner With Us */}
      <section className="bg-brand-black py-24">
        <div className="default-container">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-[40px] text-brand-white uppercase tracking-wide">Why Partner With Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-surface2 flex items-center justify-center text-brand-accent mb-6">
                <Truck size={28} />
              </div>
              <h3 className="font-bebas text-[28px] text-brand-cream uppercase mb-3">No Minimum Order</h3>
              <p className="font-inter text-brand-muted text-[15px] leading-relaxed">
                Order 1 piece or 1000 pieces. We support your brand's growth at every stage without inventory pressure.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-surface2 flex items-center justify-center text-brand-accent mb-6">
                <Factory size={28} />
              </div>
              <h3 className="font-bebas text-[28px] text-brand-cream uppercase mb-3">Delhi Factory Direct</h3>
              <p className="font-inter text-brand-muted text-[15px] leading-relaxed">
                Skip the middlemen. Get premium manufacturing quality directly from our established Delhi facility.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-surface2 flex items-center justify-center text-brand-accent mb-6">
                <Unlock size={28} />
              </div>
              <h3 className="font-bebas text-[28px] text-brand-cream uppercase mb-3">Reseller Price Unlock</h3>
              <p className="font-inter text-brand-muted text-[15px] leading-relaxed">
                Approved partners get exclusive access to our B2B wholesale pricing portal for maximum margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Task 25: How It Works */}
      <section className="bg-brand-surface1 border-y border-brand-border py-24 overflow-hidden relative">
        <div className="default-container relative z-10">
          <h2 className="font-bebas text-[40px] text-brand-white uppercase tracking-wide text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-[1px] bg-brand-border border-dashed z-0" />
            
            {[
              { step: 1, title: 'Register Free', desc: 'Create your reseller account with basic business details.' },
              { step: 2, title: 'Get Approved', desc: 'Our team reviews your application within 24 working hours.' },
              { step: 3, title: 'Order at Wholesale', desc: 'Login to view wholesale prices and order via WhatsApp directly.' }
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center relative z-10">
                <div className="w-14 h-14 bg-brand-black border border-brand-accent rounded-[2px] flex items-center justify-center font-bebas text-[24px] text-brand-accent mb-6">
                  {s.step}
                </div>
                <h3 className="font-bebas text-[24px] text-brand-white uppercase mb-2">{s.title}</h3>
                <p className="font-inter text-brand-muted text-[15px] max-w-[260px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Task 26: Trust Section */}
      <section className="bg-brand-black py-24">
        <div className="default-container">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <p className="font-inter font-medium text-[12px] text-brand-accent uppercase tracking-[0.2em] mb-4">Established 2013</p>
              <h2 className="font-bebas text-[48px] md:text-[64px] leading-none text-brand-white uppercase mb-6">12 Years of Quality Manufacturing</h2>
              <p className="font-inter text-brand-muted text-[16px] leading-[1.7] mb-8">
                Highgrand began with a simple mission: to provide independent apparel brands and boutiques with the highest quality heavyweight fabrics without typical factory hurdles. Operating out of our core facility in Delhi, we control every aspect of the process from knitting to bio-washing.
              </p>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-brand-surface1 border border-brand-border aspect-[4/3] flex flex-col items-center justify-center p-6 text-center">
                <span className="font-bebas text-[36px] text-brand-white">GST ✓</span>
                <span className="font-inter text-[12px] text-brand-muted uppercase tracking-widest mt-2">Registered</span>
              </div>
              <div className="bg-brand-surface1 border border-brand-border aspect-[4/3] flex flex-col items-center justify-center p-6 text-center">
                <span className="font-bebas text-[36px] text-brand-white">100%</span>
                <span className="font-inter text-[12px] text-brand-muted uppercase tracking-widest mt-2">Combed Cotton</span>
              </div>
              <div className="bg-brand-surface1 border border-brand-border aspect-[4/3] flex flex-col items-center justify-center p-6 text-center">
                <span className="font-bebas text-[36px] text-brand-white">0 MOQ</span>
                <span className="font-inter text-[12px] text-brand-muted uppercase tracking-widest mt-2">No Minimums</span>
              </div>
              <div className="bg-brand-surface1 border border-brand-border aspect-[4/3] flex flex-col items-center justify-center p-6 text-center shadow-inner">
                <span className="font-bebas text-[36px] text-brand-accent">ISO</span>
                <span className="font-inter text-[12px] text-brand-muted uppercase tracking-widest mt-2">Standards Maintained</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
