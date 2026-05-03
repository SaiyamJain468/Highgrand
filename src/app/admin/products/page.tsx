import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteProduct } from "./actions"

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8 lg:p-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Products</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-2">Manage your catalog, edit pricing, and update stock.</p>
        </div>
        <Link href="/admin/products/new" className="bg-brand-white text-brand-black px-6 py-3 font-inter text-[12px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors block">
          + Add Product
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6 w-16">Image</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Product</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Category</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">MRP</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Wholesale</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Status</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-brand-muted font-inter text-[13px]">No products found.</td>
                </tr>
              ) : (
                products.map((product) => {
                  let firstImage = ""
                  try {
                    const parsed = JSON.parse(product.images)
                    if (Array.isArray(parsed) && parsed.length > 0) firstImage = parsed[0]
                  } catch (e) {}

                  return (
                    <tr key={product.id} className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="w-12 h-12 bg-brand-surface2 border border-brand-border overflow-hidden">
                          {firstImage ? (
                            <img src={firstImage} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-brand-surface2" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-inter text-[13px] text-brand-white font-medium">{product.name}</td>
                      <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">{product.category?.name}</td>
                      <td className="py-4 px-6 font-inter text-[13px] text-brand-white">{product.mrpLabel}</td>
                      <td className="py-4 px-6 font-inter text-[13px] text-brand-accent">{product.wholesaleLabel}</td>
                      <td className="py-4 px-6">
                        <span className={`text-[10px] px-2 py-1 font-inter font-semibold uppercase tracking-wider ${product.isActive ? 'bg-[#0D2010] text-brand-success' : 'bg-[#2A2A2A] text-brand-disabled'}`}>
                          {product.isActive ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-4 px-6 flex items-center gap-4 mt-2">
                        <Link href={`/admin/products/${product.id}`} className="text-brand-muted hover:text-brand-white font-inter text-[12px] underline underline-offset-2">Edit</Link>
                        <form action={async () => {
                          "use server"
                          await deleteProduct(product.id)
                        }}>
                          <button type="submit" className="text-brand-muted hover:text-red-500 font-inter text-[12px] underline underline-offset-2">Delete</button>
                        </form>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
