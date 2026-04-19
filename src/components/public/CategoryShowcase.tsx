"use client"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CategoryShowcase() {
  const categories = [
    { id: '1', name: 'Oversized Tees', slug: 'oversized-tshirts', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop' },
    { id: '2', name: 'Polo T-Shirts', slug: 'polo-tshirts', status: 'COMING_SOON', image: null },
    { id: '3', name: 'Hoodies', slug: 'hoodies', status: 'COMING_SOON', image: null },
    { id: '4', name: 'Cargo Pants', slug: 'cargo-pants', status: 'COMING_SOON', image: null },
  ]

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <section className="bg-brand-black py-32 relative overflow-hidden">
      {/* Background Texture Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#111_0%,transparent_70%)] opacity-50" />
      
      <div className="default-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <p className="font-inter font-medium text-[12px] text-brand-muted uppercase tracking-[0.2em] mb-3">Our Blanks Library</p>
            <h2 className="font-bebas text-[48px] md:text-[64px] text-brand-white uppercase tracking-tight leading-none">Shop by Category</h2>
          </div>
          <Link href="/products" className="hidden border-b border-brand-accent text-brand-accent pb-1 font-inter text-[13px] uppercase tracking-[0.1em] hover:text-brand-white hover:border-brand-white transition-colors">
            View Complete Catalog →
          </Link>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 group/grid"
        >
          {categories.map((cat) => {
            const isActive = cat.status === 'ACTIVE'
            
            if (!isActive) {
              return (
                <motion.div variants={itemVariants} key={cat.id} className="aspect-[3/4] bg-brand-black border border-brand-border/30 relative overflow-hidden group/item flex flex-col items-center justify-center p-8 text-center transition-all duration-500 hover:border-brand-border/80 hover:bg-[#080808]">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-20 group-hover/item:opacity-40 transition-opacity duration-700" />
                  <span className="relative z-10 bg-[#111] border border-brand-border/50 text-brand-muted text-[10px] px-3 py-1 font-inter font-medium uppercase tracking-widest mb-4 group-hover/item:border-brand-accent/30 group-hover/item:text-brand-white transition-colors duration-500">In Development</span>
                  <h3 className="relative z-10 font-bebas text-[28px] text-brand-disabled uppercase tracking-wide group-hover/item:text-brand-muted transition-colors duration-500">{cat.name}</h3>
                </motion.div>
              )
            }

            return (
              <Link key={cat.id} href={`/products?category=${cat.slug}`} passHref legacyBehavior>
                <motion.a variants={itemVariants} className="block relative aspect-[3/4] overflow-hidden bg-brand-surface1 border border-brand-border flex-1 cursor-pointer group/card lg:hover:w-[120%] lg:transition-all lg:duration-700 lg:ease-out">
                  {/* Category Image */}
                  <img src={cat.image || undefined} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ease-out group-hover/card:scale-110 filter saturate-[0.8] group-hover/card:saturate-[1.2] group-hover/grid:brightness-50 group-hover/card:brightness-100" />
                  
                  {/* Gradients */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none opacity-90 transition-opacity duration-500 group-hover/card:opacity-100" />
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 border-[2px] border-brand-accent/0 group-hover/card:border-brand-accent/50 transition-colors duration-500 pointer-events-none" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end h-full">
                    <div className="overflow-hidden">
                      <p className="font-inter font-bold text-[11px] text-brand-accent tracking-[0.2em] uppercase mb-2 translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 ease-out">Ready to Ship</p>
                    </div>
                    <h3 className="font-bebas text-[36px] md:text-[44px] text-brand-white uppercase leading-[0.9] mb-4 drop-shadow-xl">{cat.name}</h3>
                    
                    <div className="flex items-center justify-between border-t border-brand-border/30 pt-4 mt-2">
                       <p className="font-inter text-[12px] font-medium text-brand-muted uppercase tracking-widest group-hover/card:text-brand-white transition-colors duration-300">
                         Explore
                       </p>
                       <div className="w-8 h-8 rounded-full border border-brand-border/50 flex items-center justify-center text-brand-white group-hover/card:bg-brand-accent group-hover/card:border-brand-accent group-hover/card:text-brand-black transition-all duration-300">
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                       </div>
                    </div>
                  </div>
                </motion.a>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
