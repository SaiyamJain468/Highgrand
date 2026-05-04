import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ProductForm from "./ProductForm"

export default async function NewProduct() {
  const categories = await prisma.category.findMany()

  return (
    <div className="p-8 lg:p-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">New Product</h1>
        <Link href="/admin/products" className="text-brand-accent hover:text-brand-white font-inter text-[13px] transition-colors mt-2 block">
          ← Back to Products
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border p-6 md:p-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  )
}
