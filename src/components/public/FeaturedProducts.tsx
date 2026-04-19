import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function FeaturedProducts() {
  const session = await getServerSession(authOptions)
  const isReseller = session?.user?.role === "RESELLER" && session?.user?.status === "APPROVED"

  const products = [
    { 
      id: '1', name: 'Premium Oversized T-Shirt - Black', slug: 'premium-oversized-black', 
      images: '["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Oversized T-Shirts' }, gsm: 220, composition: '100% Cotton', 
      mrpLabel: '₹850/piece', wholesaleLabel: '₹420/piece' 
    },
    { 
      id: '2', name: 'Premium Oversized T-Shirt - White', slug: 'premium-oversized-white', 
      images: '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Oversized T-Shirts' }, gsm: 220, composition: '100% Cotton', 
      mrpLabel: '₹850/piece', wholesaleLabel: '₹420/piece' 
    }
  ]

  return (
    <section className="bg-brand-surface1 py-24 border-y border-brand-border">
      <div className="default-container">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-bebas text-[40px] text-brand-white uppercase tracking-wide leading-none">Featured Styles</h2>
          <Link href="/products" className="font-inter text-[13px] text-brand-muted hover:text-brand-white transition-colors uppercase tracking-[0.12em] font-medium hidden sm:block">
            View All →
          </Link>
        </div>
        
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 sm:pb-0 snap-x snap-mandatory">
          {products.map((product) => {
            const imageUrls = product.images ? JSON.parse(product.images) : []
            const image = imageUrls[0] || 'https://via.placeholder.com/600x800'
            
            return (
              <Link key={product.id} href={`/products/${product.slug}`} className="group min-w-[280px] sm:min-w-0 snap-start block bg-brand-surface1 border border-brand-border rounded-[2px] transition-colors hover:border-brand-borderHover">
                <div className="aspect-[3/4] bg-brand-surface2 overflow-hidden relative">
                  <img src={image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-brand-surface1/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1.5 font-inter text-[10px] font-semibold uppercase tracking-widest text-brand-accent">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                      In Stock
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  <p className="font-inter text-[11px] font-medium text-brand-accent uppercase tracking-widest">{product.category.name}</p>
                  <h3 className="font-bebas text-[22px] text-brand-cream leading-[1.1] uppercase truncate">{product.name}</h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-accentSurface text-brand-accent text-[11px] px-2 py-0.5 font-inter font-semibold">{product.gsm} GSM</span>
                    <span className="text-[13px] text-brand-muted truncate">{product.composition}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-brand-border mt-1">
                    {isReseller ? (
                      <div className="flex items-center gap-3">
                        <span className="font-bebas text-[24px] text-brand-accent leading-none">{product.wholesaleLabel}</span>
                        <span className="bg-[#0D2010] text-brand-success text-[10px] px-2 py-0.5 font-inter font-semibold uppercase tracking-wider">Reseller Price</span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="font-inter font-semibold text-[14px] text-brand-white">MRP: {product.mrpLabel}</span>
                        <span className="text-[12px] text-brand-muted flex items-center gap-1 mt-1">
                          🔒 Login for reseller price
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-[12px] text-brand-muted mt-2 group-hover:text-brand-white transition-colors duration-150">
                    View Details →
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
