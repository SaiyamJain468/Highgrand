import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const session = await getServerSession(authOptions)
  const isReseller = session?.user?.role === "RESELLER" && session?.user?.status === "APPROVED"

  const activeCategoryParam = searchParams.category || 'all'

  const categories = [
    { id: '1', name: 'Oversized T-Shirts', slug: 'oversized-tshirts' },
    { id: '2', name: 'Premium Basics', slug: 'premium-basics' },
  ]
  let products: any[] = [
    { 
      id: '1', name: 'Premium Oversized T-Shirt - Black', slug: 'premium-oversized-black', 
      images: '["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Oversized T-Shirts', slug: 'oversized-tshirts' }, gsm: 220, composition: '100% Cotton', 
      mrpLabel: '₹850/piece', wholesaleLabel: '₹420/piece' 
    },
    { 
      id: '2', name: 'Premium Oversized T-Shirt - White', slug: 'premium-oversized-white', 
      images: '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"]', 
      category: { name: 'Oversized T-Shirts', slug: 'oversized-tshirts' }, gsm: 220, composition: '100% Cotton', 
      mrpLabel: '₹850/piece', wholesaleLabel: '₹420/piece' 
    }
  ]
  
  if (activeCategoryParam !== 'all') {
    products = products.filter(p => p.category.slug === activeCategoryParam)
  }

  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24">
      {/* Task 29: Page Hero */}
      <div className="default-container mb-12">
        <h1 className="font-bebas text-[72px] text-brand-white uppercase leading-none tracking-tight">OUR COLLECTION</h1>
        <p className="font-inter text-[15px] text-brand-muted max-w-[500px] mt-4">
          Browse our catalog of premium heavyweight apparel. Login as an approved reseller to view wholesale pricing.
        </p>
      </div>

      {/* Task 30: Category tab filter */}
      <div className="default-container mb-12 border-b border-brand-border">
        <div className="flex overflow-x-auto hide-scrollbar gap-8">
          <Link 
            href="/products" 
            className={`font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 transition-colors whitespace-nowrap ${activeCategoryParam === 'all' ? 'text-brand-accent border-brand-accent' : 'text-brand-muted border-transparent hover:text-brand-white'}`}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              href={`/products?category=${cat.slug}`} 
              className={`font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 transition-colors whitespace-nowrap ${activeCategoryParam === cat.slug ? 'text-brand-accent border-brand-accent' : 'text-brand-muted border-transparent hover:text-brand-white'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Task 31: Product Grid */}
      <div className="default-container">
        {products.length === 0 ? (
          <div className="py-24 text-center border border-brand-border border-dashed">
            <h3 className="font-bebas text-[32px] text-brand-disabled uppercase">No products found</h3>
            <p className="font-inter text-brand-muted mt-2">Check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const imageUrls = product.images ? JSON.parse(product.images) : []
              const image = imageUrls[0] || 'https://via.placeholder.com/600x800'

              return (
                <Link key={product.id} href={`/products/${product.slug}`} className="group block bg-brand-surface1 border border-brand-border rounded-[2px] transition-colors hover:border-brand-borderHover">
                  <div className="aspect-[3/4] bg-brand-surface2 overflow-hidden relative">
                    <img src={image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]" />
                  </div>
                  
                  <div className="p-5 flex flex-col gap-3">
                    <p className="font-inter text-[11px] font-medium text-brand-accent uppercase tracking-widest">{product.category.name}</p>
                    <h3 className="font-bebas text-[24px] text-brand-cream leading-[1.1] uppercase">{product.name}</h3>
                    
                    <div className="flex items-center gap-2">
                      <span className="bg-brand-accentSurface text-brand-accent text-[11px] px-2 py-0.5 font-inter font-semibold">{product.gsm} GSM</span>
                      <span className="text-[13px] text-brand-muted truncate">{product.composition}</span>
                    </div>
                    
                    <div className="pt-3 border-t border-brand-border mt-2">
                      {isReseller ? (
                        <div className="flex justify-between items-center">
                          <span className="font-bebas text-[28px] text-brand-accent leading-none">{product.wholesaleLabel}</span>
                          <span className="bg-[#0D2010] text-brand-success text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider">Reseller</span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="font-inter font-semibold text-[15px] text-brand-white">MRP: {product.mrpLabel}</span>
                          <span className="text-[12px] text-brand-muted flex items-center gap-1 mt-1">
                            🔒 Login to see reseller price
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
