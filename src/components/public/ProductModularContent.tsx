"use client"

import { motion } from "framer-motion"

interface ContentBlock {
  id: string
  type: "banner" | "features" | "split" | "text" | "carousel" | "accordion"
  data: any
}

export default function ProductModularContent({ blocksJson }: { blocksJson?: string | null }) {
  if (!blocksJson) return null
  
  let blocks: ContentBlock[] = []
  try {
    blocks = JSON.parse(blocksJson)
  } catch (e) {
    return null
  }

  if (!blocks.length) return null

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "banner":
            return (
              <section key={block.id} className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                {block.data.image && (
                  <img src={block.data.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-brand-black/60" />
                <div className="relative z-10 text-center px-4 max-w-4xl">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-bebas text-[48px] md:text-[80px] text-brand-white leading-tight uppercase"
                  >
                    {block.data.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-inter text-[14px] md:text-[18px] text-brand-muted mt-4 uppercase tracking-[0.2em]"
                  >
                    {block.data.subtitle}
                  </motion.p>
                </div>
              </section>
            )
          
          case "features":
            return (
              <section key={block.id} className="py-24 bg-brand-black border-y border-brand-border">
                <div className="max-w-[1400px] mx-auto px-6">
                  {block.data.title && (
                    <h3 className="font-bebas text-[32px] text-brand-white uppercase tracking-tighter mb-16 text-center">
                      {block.data.title}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {block.data.items.map((item: any, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center text-center group"
                      >
                        <div className="w-12 h-12 bg-brand-surface1 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-accent transition-colors">
                          <span className="font-bebas text-brand-accent text-[20px]">{i + 1}</span>
                        </div>
                        <h4 className="font-bebas text-[24px] text-brand-white uppercase mb-4">{item.title}</h4>
                        <p className="font-inter text-[14px] text-brand-muted leading-relaxed max-w-[280px]">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case "split":
            return (
              <section key={block.id} className="grid grid-cols-1 md:grid-cols-2 bg-brand-surface1">
                <div className={`p-12 md:p-24 flex flex-col justify-center ${block.data.reverse ? 'md:order-2' : ''}`}>
                  <motion.h3 
                    initial={{ opacity: 0, x: block.data.reverse ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="font-bebas text-[40px] text-brand-white uppercase leading-none mb-8"
                  >
                    {block.data.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="font-inter text-[15px] text-brand-muted leading-relaxed"
                  >
                    {block.data.text}
                  </motion.p>
                </div>
                <div className={`h-[500px] md:h-auto ${block.data.reverse ? 'md:order-1' : ''}`}>
                  {block.data.image && (
                    <img src={block.data.image} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  )}
                </div>
              </section>
            )

          case "carousel":
            return (
              <section key={block.id} className="py-24 bg-brand-surface1">
                <div className="max-w-[1400px] mx-auto px-6">
                  {block.data.title && (
                    <h3 className="font-bebas text-[32px] text-brand-white uppercase mb-12">{block.data.title}</h3>
                  )}
                  <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8">
                    {block.data.images?.map((img: string, i: number) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-shrink-0 w-[300px] md:w-[500px] aspect-[4/5] bg-brand-black"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case "accordion":
            return (
              <section key={block.id} className="py-24 max-w-4xl mx-auto px-6">
                {block.data.title && (
                  <h3 className="font-bebas text-[32px] text-brand-white uppercase mb-12 text-center">{block.data.title}</h3>
                )}
                <div className="space-y-4">
                  {block.data.items.map((item: any, i: number) => (
                    <div key={i} className="border border-brand-border bg-brand-surface1 p-6">
                      <h4 className="font-bebas text-[20px] text-brand-accent uppercase mb-3">{item.title}</h4>
                      <p className="font-inter text-[14px] text-brand-muted leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )

          case "text":
            return (
              <section key={block.id} className="py-24 max-w-3xl mx-auto px-6 text-center">
                <h3 className="font-bebas text-[32px] text-brand-white uppercase mb-8">{block.data.title}</h3>
                <p className="font-inter text-[16px] text-brand-muted leading-relaxed whitespace-pre-line">
                  {block.data.text}
                </p>
              </section>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
