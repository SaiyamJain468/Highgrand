"use client"

import { useState } from "react"
import { Plus, Trash2, Layout, Type, Image as ImageIcon, Layers, X } from "lucide-react"
import ImageUpload from "./ImageUpload"

interface ContentBlock {
  id: string
  type: "banner" | "features" | "split" | "text" | "carousel" | "accordion"
  data: any
}

interface ProductContentBuilderProps {
  initialValue?: string
  onChange: (value: string) => void
}

export default function ProductContentBuilder({ initialValue, onChange }: ProductContentBuilderProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    initialValue ? JSON.parse(initialValue) : []
  )

  const updateBlocks = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks)
    onChange(JSON.stringify(newBlocks))
  }

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: type === "banner" ? { title: "", subtitle: "", image: "" } :
            type === "features" ? { title: "", items: [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }] } :
            type === "split" ? { title: "", text: "", image: "", reverse: false } :
            type === "carousel" ? { title: "", images: [] } :
            type === "accordion" ? { title: "", items: [{ title: "", content: "" }] } :
            { title: "", text: "" }
    }
    updateBlocks([...blocks, newBlock])
  }

  const removeBlock = (id: string) => {
    updateBlocks(blocks.filter(b => b.id !== id))
  }

  const updateBlockData = (id: string, data: any) => {
    updateBlocks(blocks.map(b => b.id === id ? { ...b, data } : b))
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-brand-border pb-4">
        <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight">Modular Content Sections</h3>
        <div className="flex gap-2">
          <button type="button" onClick={() => addBlock("banner")} className="p-2 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-accent transition-all" title="Add Banner"><Layout size={16} /></button>
          <button type="button" onClick={() => addBlock("features")} className="p-2 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-accent transition-all" title="Add Features"><Layers size={16} /></button>
          <button type="button" onClick={() => addBlock("split")} className="p-2 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-accent transition-all" title="Add Split Section"><ImageIcon size={16} /></button>
          <button type="button" onClick={() => addBlock("carousel")} className="p-2 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-accent transition-all" title="Add Image Carousel"><Plus size={16} /></button>
          <button type="button" onClick={() => addBlock("accordion")} className="p-2 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-accent transition-all" title="Add Accordion"><Type size={16} /></button>
          <button type="button" onClick={() => addBlock("text")} className="p-2 bg-brand-surface2 border border-brand-border text-brand-muted hover:text-brand-accent transition-all" title="Add Text Block"><Type size={16} /></button>
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-brand-border bg-brand-surface1/30">
          <p className="font-inter text-[13px] text-brand-muted uppercase tracking-widest">No custom sections added yet.</p>
          <p className="font-inter text-[11px] text-brand-disabled mt-2">Use the icons above to build your premium product story.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {blocks.map((block, index) => (
            <div key={block.id} className="relative bg-brand-surface2 border border-brand-border p-8 group">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-brand-accent text-brand-black font-bebas flex items-center justify-center text-[18px]">
                {index + 1}
              </div>
              
              <button 
                type="button" 
                onClick={() => removeBlock(block.id)}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-error transition-colors"
              >
                <Trash2 size={18} />
              </button>

              <div className="mb-4">
                <span className="font-bebas text-[14px] text-brand-accent uppercase tracking-widest">{block.type} section</span>
              </div>

              {/* Block Specific Editors */}
              {block.type === "banner" && (
                <div className="flex flex-col gap-4">
                  <input 
                    placeholder="Headline (e.g. Industrial Durability)" 
                    value={block.data.title}
                    onChange={(e) => updateBlockData(block.id, { ...block.data, title: e.target.value })}
                    className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none"
                  />
                  <textarea 
                    placeholder="Subtext" 
                    value={block.data.subtitle}
                    onChange={(e) => updateBlockData(block.id, { ...block.data, subtitle: e.target.value })}
                    className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none resize-none"
                  />
                  <ImageUpload 
                    value={block.data.image ? [block.data.image] : []}
                    onChange={(url) => updateBlockData(block.id, { ...block.data, image: url })}
                    onRemove={() => updateBlockData(block.id, { ...block.data, image: "" })}
                    maxFiles={1}
                  />
                </div>
              )}

              {block.type === "features" && (
                <div className="flex flex-col gap-6">
                  <input 
                    placeholder="Section Title" 
                    value={block.data.title}
                    onChange={(e) => updateBlockData(block.id, { ...block.data, title: e.target.value })}
                    className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none font-bold"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {block.data.items.map((item: any, i: number) => (
                      <div key={i} className="flex flex-col gap-2 p-4 bg-brand-black/40 border border-brand-border/50">
                        <input 
                          placeholder={`Feature ${i+1}`}
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...block.data.items]
                            newItems[i].title = e.target.value
                            updateBlockData(block.id, { ...block.data, items: newItems })
                          }}
                          className="bg-transparent border-b border-brand-border p-1 text-brand-accent text-xs outline-none"
                        />
                        <textarea 
                          placeholder="Description"
                          value={item.desc}
                          onChange={(e) => {
                            const newItems = [...block.data.items]
                            newItems[i].desc = e.target.value
                            updateBlockData(block.id, { ...block.data, items: newItems })
                          }}
                          className="bg-transparent text-brand-muted text-xs outline-none resize-none h-16"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {block.type === "split" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <input 
                      placeholder="Title" 
                      value={block.data.title}
                      onChange={(e) => updateBlockData(block.id, { ...block.data, title: e.target.value })}
                      className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none"
                    />
                    <textarea 
                      placeholder="Description Text" 
                      value={block.data.text}
                      onChange={(e) => updateBlockData(block.id, { ...block.data, text: e.target.value })}
                      className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none resize-none h-32"
                    />
                    <label className="flex items-center gap-2 cursor-pointer mt-2">
                      <input 
                        type="checkbox" 
                        checked={block.data.reverse}
                        onChange={(e) => updateBlockData(block.id, { ...block.data, reverse: e.target.checked })}
                        className="w-4 h-4 bg-brand-black accent-brand-accent"
                      />
                      <span className="text-[11px] text-brand-muted uppercase font-bold tracking-widest">Reverse Layout</span>
                    </label>
                  </div>
                  <div>
                    <ImageUpload 
                      value={block.data.image ? [block.data.image] : []}
                      onChange={(url) => updateBlockData(block.id, { ...block.data, image: url })}
                      onRemove={() => updateBlockData(block.id, { ...block.data, image: "" })}
                      maxFiles={1}
                    />
                  </div>
                </div>
              )}

              {block.type === "carousel" && (
                <div className="flex flex-col gap-4">
                  <input 
                    placeholder="Carousel Title" 
                    value={block.data.title}
                    onChange={(e) => updateBlockData(block.id, { ...block.data, title: e.target.value })}
                    className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none"
                  />
                  <ImageUpload 
                    value={block.data.images || []}
                    onChange={(url) => {
                      const newImages = [...(block.data.images || []), url]
                      updateBlockData(block.id, { ...block.data, images: newImages })
                    }}
                    onRemove={(url) => {
                      const newImages = (block.data.images || []).filter((u: string) => u !== url)
                      updateBlockData(block.id, { ...block.data, images: newImages })
                    }}
                    maxFiles={10}
                  />
                </div>
              )}

              {block.type === "accordion" && (
                <div className="flex flex-col gap-6">
                  <input 
                    placeholder="Accordion Heading" 
                    value={block.data.title}
                    onChange={(e) => updateBlockData(block.id, { ...block.data, title: e.target.value })}
                    className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none font-bold"
                  />
                  <div className="flex flex-col gap-4">
                    {block.data.items.map((item: any, i: number) => (
                      <div key={i} className="p-4 bg-brand-black/40 border border-brand-border/50 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-brand-accent uppercase font-bold">Item {i+1}</span>
                          {block.data.items.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => {
                                const newItems = block.data.items.filter((_: any, idx: number) => idx !== i)
                                updateBlockData(block.id, { ...block.data, items: newItems })
                              }}
                              className="text-brand-muted hover:text-brand-error"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                        <input 
                          placeholder="Title"
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...block.data.items]
                            newItems[i].title = e.target.value
                            updateBlockData(block.id, { ...block.data, items: newItems })
                          }}
                          className="bg-transparent border-b border-brand-border p-1 text-brand-white text-xs outline-none"
                        />
                        <textarea 
                          placeholder="Content"
                          value={item.content}
                          onChange={(e) => {
                            const newItems = [...block.data.items]
                            newItems[i].content = e.target.value
                            updateBlockData(block.id, { ...block.data, items: newItems })
                          }}
                          className="bg-transparent text-brand-muted text-xs outline-none resize-none h-20"
                        />
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => {
                        const newItems = [...block.data.items, { title: "", content: "" }]
                        updateBlockData(block.id, { ...block.data, items: newItems })
                      }}
                      className="p-2 border border-dashed border-brand-border text-brand-muted text-xs uppercase hover:text-brand-accent transition-colors"
                    >
                      + Add Accordion Item
                    </button>
                  </div>
                </div>
              )}

              {block.type === "text" && (
                <div className="flex flex-col gap-4">
                  <input 
                    placeholder="Heading" 
                    value={block.data.title}
                    onChange={(e) => updateBlockData(block.id, { ...block.data, title: e.target.value })}
                    className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none"
                  />
                  <textarea 
                    placeholder="Write your story here..." 
                    value={block.data.text}
                    onChange={(e) => updateBlockData(block.id, { ...block.data, text: e.target.value })}
                    className="bg-brand-black border border-brand-border p-3 text-brand-white text-sm outline-none resize-none h-40"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hidden Input for Form Submission */}
      <input type="hidden" name="customContent" value={JSON.stringify(blocks)} />
    </div>
  )
}
