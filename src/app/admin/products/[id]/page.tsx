import { updateProduct } from "../../actions"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function EditProduct({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  if (!product) notFound()

  const categories = await prisma.category.findMany()

  // Bind ID to action
  const updateProductWithId = updateProduct.bind(null, product.id)

  return (
    <div className="p-8 lg:p-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Edit Product</h1>
        <Link href="/admin/products" className="text-brand-accent hover:text-brand-white font-inter text-[13px] transition-colors mt-2 block">
          ← Back to Products
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border p-6 md:p-8">
        <form action={updateProductWithId} className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Name *</label>
              <input name="name" type="text" defaultValue={product.name} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Slug *</label>
              <input name="slug" type="text" defaultValue={product.slug} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Category *</label>
            <select name="categoryId" defaultValue={product.categoryId} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors">
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Short Description</label>
            <textarea name="shortDescription" rows={2} defaultValue={product.shortDescription || ''} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Long Description</label>
            <textarea name="longDescription" rows={5} defaultValue={product.longDescription || ''} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">MRP Label</label>
              <input name="mrpLabel" type="text" defaultValue={product.mrpLabel || ''} required placeholder="₹850" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Wholesale Label</label>
              <input name="wholesaleLabel" type="text" defaultValue={product.wholesaleLabel || ''} required placeholder="₹420" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">MOQ Note</label>
              <input name="moqNote" type="text" defaultValue={product.moqNote || ''} required placeholder="No minimum order" className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">GSM</label>
              <input name="gsm" type="number" defaultValue={product.gsm || 0} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Composition</label>
              <input name="composition" type="text" defaultValue={product.composition || ''} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Weave</label>
              <input name="weave" type="text" defaultValue={product.weave || ''} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Finish</label>
              <input name="finish" type="text" defaultValue={product.finish || ''} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Wash Care</label>
            <input name="washCare" type="text" defaultValue={product.washCare || ''} required className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Images (JSON Array)</label>
            <input name="images" type="text" defaultValue={product.images || "[]"} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
            <p className="text-[11px] text-brand-muted">Paste JSON array of image URLs (e.g. ["url1", "url2"])</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Sizes (JSON Array)</label>
            <input name="sizes" type="text" defaultValue={product.sizes || "[]"} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-inter text-[11px] font-bold text-brand-muted uppercase tracking-widest">Colors (JSON Array)</label>
            <input name="colors" type="text" defaultValue={product.colors || "[]"} className="bg-brand-black border border-brand-border p-3 text-brand-white font-inter text-[14px] focus:outline-none focus:border-brand-accent transition-colors" />
          </div>

          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isActive" value="true" defaultChecked={product.isActive} className="w-4 h-4 bg-brand-black border-brand-border accent-brand-accent" />
              <span className="font-inter text-[13px] text-brand-white">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" value="true" defaultChecked={product.isFeatured} className="w-4 h-4 bg-brand-black border-brand-border accent-brand-accent" />
              <span className="font-inter text-[13px] text-brand-white">Featured</span>
            </label>
          </div>

          <button type="submit" className="bg-brand-white text-brand-black px-6 py-4 mt-4 font-inter text-[13px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors self-start">
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}
