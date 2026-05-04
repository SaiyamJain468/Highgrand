import { prisma } from "@/lib/prisma"
import ProductForm from "./ProductForm"
import { AdminHeader } from "@/components/admin/AdminHeader"

export default async function NewProduct() {
  const categories = await prisma.category.findMany()

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto">
      <AdminHeader 
        title="Product Blueprint" 
        subtitle="Specify technical details, pricing models, and visual assets for a new catalog entry."
        breadcrumbs={[
          { label: "Products", href: "/admin/products" },
          { label: "New Product" }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-brand-surface1 border border-brand-border p-10 shadow-2xl">
            <ProductForm categories={categories} />
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-brand-surface1 border border-brand-border p-8 sticky top-8">
            <h3 className="font-bebas text-[24px] text-brand-white uppercase tracking-tight mb-4">Guidelines</h3>
            <ul className="space-y-4 font-inter text-[13px] text-brand-muted">
              <li className="flex gap-3">
                <span className="text-brand-accent font-bold">01.</span>
                <span>Upload high-resolution assets for the professional showcase.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-accent font-bold">02.</span>
                <span>Ensure the Wholesale price is competitive for approved resellers.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-accent font-bold">03.</span>
                <span>The slug must be unique and SEO-friendly (lowercase with hyphens).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
