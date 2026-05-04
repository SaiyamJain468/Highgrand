"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition, useEffect } from "react"
import { Search, X, SlidersHorizontal } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
}

interface Props {
  categories: Category[]
  activeCategory: string
}

export default function SearchFilter({ categories, activeCategory }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchValue) {
        params.set("q", searchValue)
      } else {
        params.delete("q")
      }
      
      startTransition(() => {
        router.push(`/products?${params.toString()}`, { scroll: false })
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue, router, searchParams])

  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete("category")
    } else {
      params.set("category", slug)
    }
    
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div className="flex flex-col gap-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Search Input */}
        <div className="relative group flex-1 max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-muted group-focus-within:text-brand-accent transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search premium blanks..."
            className="w-full bg-brand-surface1 border border-brand-border py-4 pl-12 pr-12 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-disabled rounded-sm"
          />
          {searchValue && (
            <button 
              onClick={() => setSearchValue("")}
              className="absolute inset-y-0 right-4 flex items-center text-brand-muted hover:text-brand-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden flex items-center justify-center gap-2 border border-brand-border py-4 px-6 text-brand-white font-inter text-[13px] uppercase tracking-widest"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* Category Tabs */}
      <div className={`md:flex ${isFilterOpen ? 'flex' : 'hidden'} flex-col md:flex-row gap-4 md:gap-8 border-b border-brand-border/30 pb-4 overflow-x-auto hide-scrollbar`}>
        <button 
          onClick={() => handleCategoryClick('all')}
          className={`font-inter text-[12px] uppercase tracking-[0.2em] pb-3 transition-all relative whitespace-nowrap ${
            activeCategory === 'all' 
              ? 'text-brand-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-accent' 
              : 'text-brand-muted hover:text-brand-white'
          }`}
        >
          All Blanks
        </button>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`font-inter text-[12px] uppercase tracking-[0.2em] pb-3 transition-all relative whitespace-nowrap ${
              activeCategory === cat.slug 
                ? 'text-brand-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-accent' 
                : 'text-brand-muted hover:text-brand-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
        
        {isPending && (
          <div className="ml-auto flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Updating...</span>
          </div>
        )}
      </div>
    </div>
  )
}
