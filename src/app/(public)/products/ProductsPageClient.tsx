"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import SearchFilter from "@/components/public/SearchFilter"

export default function ProductsPageClient({ 
  products, 
  categories, 
  activeCategory, 
  isReseller 
}: { 
  products: any[], 
  categories: any[], 
  activeCategory: string,
  isReseller: boolean
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24">
      <div className="default-container mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bebas text-[72px] text-brand-white uppercase leading-none tracking-tight"
        >
          OUR COLLECTION
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="font-inter text-[15px] text-brand-muted max-w-[500px] mt-4"
        >
          Browse our catalog of premium heavyweight apparel. Login as an approved reseller to view wholesale pricing.
        </motion.p>
      </div>

      <div className="default-container">
        <SearchFilter 
          categories={categories} 
          activeCategory={activeCategory} 
        />
      </div>

      <div className="default-container">
        {products.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center border border-brand-border border-dashed"
          >
            <h3 className="font-bebas text-[32px] text-brand-disabled uppercase">No products found</h3>
            <p className="font-inter text-brand-muted mt-2">Check back soon for new arrivals.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => {
              const imageUrls = product.images ? JSON.parse(product.images) : []
              const image = imageUrls[0] || 'https://via.placeholder.com/600x800'

              return (
                <motion.div key={product.id} variants={item}>
                  <Link href={`/products/${product.slug}`} className="group block bg-brand-surface1 border border-brand-border rounded-[2px] transition-colors hover:border-brand-borderHover overflow-hidden">
                    <div className="aspect-[4/5] bg-brand-surface2 overflow-hidden relative">
                      <Image 
                        src={image} 
                        alt={product.name} 
                        fill
                        className={`object-cover transition-all duration-[1000ms] ease-out ${product.hoverImage ? 'group-hover:opacity-0 group-hover:scale-110' : 'group-hover:scale-[1.04]'}`} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {product.hoverImage && (
                        <Image 
                          src={product.hoverImage} 
                          alt={`${product.name} Hover`} 
                          fill
                          className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-[1000ms] ease-out" 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
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
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}
