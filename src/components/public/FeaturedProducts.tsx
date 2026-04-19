import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function FeaturedProducts() {
  const session = await getServerSession(authOptions)
  const isReseller = session?.user?.role === "RESELLER" && session?.user?.status === "APPROVED"

  const products = [
    { 
      id: '1', name: 'Premium Oversized T-Shirt - Black', slug: 'premium-oversized-black', 
      images: '["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Oversized Tees' }, gsm: 220, composition: '100% Cotton', 
      mrpLabel: '₹850', wholesaleLabel: '₹420' 
    },
    { 
      id: '2', name: 'Premium Oversized T-Shirt - White', slug: 'premium-oversized-white', 
      images: '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Oversized Tees' }, gsm: 220, composition: '100% Cotton', 
      mrpLabel: '₹850', wholesaleLabel: '₹420' 
    },
    { 
      id: '3', name: 'Vintage Wash Tee - Olive', slug: 'vintage-wash-olive', 
      images: '["https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Acid Wash' }, gsm: 240, composition: '100% Cotton', 
      mrpLabel: '₹999', wholesaleLabel: '₹550' 
    },
    { 
      id: '4', name: 'Heavyweight Boxy Fit - Navy', slug: 'boxy-fit-navy', 
      images: '["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Premium Boxy' }, gsm: 260, composition: '100% Cotton', 
      mrpLabel: '₹1200', wholesaleLabel: '₹680' 
    }
  ]

  return (
    <section className="bg-brand-black py-24 md:py-40 relative overflow-hidden border-y border-brand-border/30">
      {/* Cinematic Highlight Layer */}
      <div className="absolute top-0 right-1/4 w-[500px] h-1 bg-brand-accent shadow-[0_0_80px_30px_rgba(20,200,80,0.2)]"></div>
      
      <div className="default-container relative z-10 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div>
            <p className="font-inter font-semibold text-[11px] md:text-[13px] text-brand-accent uppercase tracking-[0.2em] mb-4">Live Restocks</p>
            <h2 className="font-bebas text-[64px] md:text-[100px] leading-[0.85] text-brand-white uppercase">Featured<br/><span className="text-brand-muted">Styles</span></h2>
          </div>
          <Link href="/products" className="border-b border-brand-accent text-brand-accent pb-1 font-inter text-[13px] uppercase tracking-[0.1em] hover:text-brand-white hover:border-brand-white transition-colors">
            View All Blanks →
          </Link>
        </div>
      </div>
      
      {/* Scrollable Container with Peek Effect */}
      <div className="flex w-full overflow-x-auto overflow-y-hidden gap-6 px-6 md:px-[5%] scroll-smooth hide-scrollbar snap-x snap-mandatory">
        {products.map((product) => {
          const imageUrls = product.images ? JSON.parse(product.images) : []
          const image = imageUrls[0] || 'https://via.placeholder.com/600x800'
          
          return (
            <Link key={product.id} href={`/products/${product.slug}`} className="group min-w-[75vw] sm:min-w-[360px] md:min-w-[420px] snap-start block bg-[#080808] border border-brand-border/30 rounded-[2px] transition-all duration-500 hover:border-brand-accent/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden relative bg-brand-surface2">
                <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image 
                  src={image} 
                  alt={product.name} 
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]" 
                  sizes="(max-width: 768px) 75vw, (max-width: 1200px) 420px, 420px"
                />
                
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <span className="bg-brand-black/80 backdrop-blur-md border border-brand-border/50 px-3 py-1.5 flex items-center gap-2 font-inter text-[10px] font-bold uppercase tracking-[0.1em] text-brand-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-success shadow-[0_0_10px_rgba(20,200,80,0.8)] animate-pulse" />
                    Live
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col justify-between relative z-20 bg-gradient-to-b from-[#080808] to-[#040404]">
                <div>
                  <h3 className="font-bebas text-[28px] md:text-[32px] text-brand-cream leading-[1.1] uppercase line-clamp-1 mb-4 group-hover:text-brand-white transition-colors">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-brand-surface2 border border-brand-border/50 text-brand-white text-[10px] px-2.5 py-1 font-inter font-bold uppercase tracking-widest">{product.gsm} GSM</span>
                    <span className="text-[12px] font-inter text-brand-muted uppercase tracking-wider">{product.composition}</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-brand-border/30">
                  {isReseller ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bebas text-[36px] text-brand-accent leading-none">{product.wholesaleLabel}</span>
                      </div>
                      <span className="text-[10px] text-brand-success px-2 py-1 bg-brand-success/10 border border-brand-success/20 font-bold uppercase tracking-widest">Reseller</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bebas text-[32px] text-brand-white leading-none mb-1">{product.mrpLabel}</span>
                        <span className="text-[11px] font-inter text-brand-muted uppercase tracking-wider">Retail MRP</span>
                      </div>
                      <span className="text-[11px] font-medium text-brand-accent bg-brand-accent/10 px-2 py-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Unlock Wholesale
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subtle base glow on hover */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-brand-accent/0 group-hover:bg-brand-accent/20 blur-[30px] rounded-full transition-colors duration-500 pointer-events-none" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
