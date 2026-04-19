import Link from "next/link"

export default async function CategoryShowcase() {
  const categories = [
    { id: '1', name: 'Oversized T-Shirts', slug: 'oversized-tshirts', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop' },
    { id: '2', name: 'Polo T-Shirts', slug: 'polo-tshirts', status: 'COMING_SOON', image: null },
    { id: '3', name: 'Hoodies', slug: 'hoodies', status: 'COMING_SOON', image: null },
    { id: '4', name: 'Cargo Pants', slug: 'cargo-pants', status: 'COMING_SOON', image: null },
  ]

  const activeCategories = categories.filter(c => c.status === 'ACTIVE')
  const comingSoonCategories = categories.filter(c => c.status === 'COMING_SOON')

  return (
    <section className="bg-brand-black py-24">
      <div className="default-container">
        <h2 className="font-bebas text-[40px] text-brand-white mb-12 uppercase tracking-wide">Shop by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const isActive = cat.status === 'ACTIVE'
            
            if (!isActive) {
              return (
                <div key={cat.id} className="aspect-[2/3] bg-brand-surface1 border border-brand-border flex items-center justify-center flex-col">
                  <span className="bg-brand-accentSurface text-brand-accent text-[11px] px-3 py-1 font-inter font-medium uppercase tracking-widest mb-3">Coming Soon</span>
                  <h3 className="font-bebas text-[24px] text-brand-disabled uppercase">{cat.name}</h3>
                </div>
              )
            }

            return (
              <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group relative aspect-[2/3] overflow-hidden bg-brand-surface1 border border-brand-border hover:border-brand-borderHover transition-colors">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]" />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-brand-surface2" />
                )}
                {/* Overlay gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-bebas text-[28px] text-brand-white uppercase leading-none mb-1">{cat.name}</h3>
                  <p className="font-inter text-[13px] text-brand-muted flex items-center gap-2">
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-accent">→</span>
                    View Collection
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
