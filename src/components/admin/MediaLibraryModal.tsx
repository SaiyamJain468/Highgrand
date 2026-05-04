"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, Image as ImageIcon, Check } from "lucide-react"
import { getMediaLibrary } from "@/app/admin/products/actions"

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  selectedUrls: string[];
}

export default function MediaLibraryModal({ isOpen, onClose, onSelect, selectedUrls }: MediaLibraryModalProps) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      getMediaLibrary().then(urls => {
        setImages(urls)
        setLoading(false)
      })
    }
  }, [isOpen])

  const filteredImages = images.filter(url => 
    url.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[80vh] bg-brand-surface1 border border-brand-border z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-black/50">
              <div className="flex items-center gap-3">
                <ImageIcon className="text-brand-accent" size={24} />
                <h2 className="font-bebas text-[32px] text-brand-white tracking-widest uppercase">Media Library</h2>
              </div>
              <button type="button" onClick={onClose} className="text-brand-muted hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-4 border-b border-brand-border bg-brand-black/20">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                <input 
                  type="text" 
                  placeholder="Search previously uploaded images..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-brand-black border border-brand-border py-3 pl-12 pr-4 text-brand-white font-inter text-sm focus:border-brand-accent outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-brand-border scrollbar-track-transparent">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-brand-muted">
                  <div className="w-12 h-12 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                  <p className="font-inter text-xs uppercase tracking-widest">Scanning Repository...</p>
                </div>
              ) : filteredImages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-muted opacity-50">
                  <ImageIcon size={48} className="mb-4" />
                  <p className="font-inter text-sm uppercase tracking-widest">No images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredImages.map((url, idx) => {
                    const isSelected = selectedUrls.includes(url);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => onSelect(url)}
                        className={`relative aspect-square bg-brand-black border-2 transition-all group overflow-hidden ${isSelected ? 'border-brand-accent' : 'border-transparent hover:border-brand-muted'}`}
                      >
                        <img src={url} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isSelected ? 'opacity-40' : ''}`} alt="library" />
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-brand-accent text-brand-black p-1.5 rounded-full shadow-lg">
                              <Check size={16} />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-brand-border bg-brand-black/50 flex justify-between items-center">
              <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">
                {filteredImages.length} images in library
              </p>
              <button 
                type="button"
                onClick={onClose}
                className="bg-brand-white text-brand-black px-8 py-3 font-inter text-[12px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors"
              >
                Close Library
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
