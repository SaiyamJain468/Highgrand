import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import ProductsPageClient from "./ProductsPageClient"

export const revalidate = 60; // Enable ISR, regenerate every 60 seconds

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const session = await getServerSession(authOptions)
  const isReseller = session?.user?.role === "RESELLER" && session?.user?.status === "APPROVED"

  const searchParamsResolved = await searchParams
  const activeCategoryParam = searchParamsResolved.category || 'all'
  const searchQuery = searchParamsResolved.q || ''

  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE" },
    orderBy: { displayOrder: 'asc' }
  })
  
  const whereClause: any = { isActive: true }
  
  if (activeCategoryParam !== 'all') {
    whereClause.category = { slug: activeCategoryParam }
  }

  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery } },
      { shortDescription: { contains: searchQuery } },
      { longDescription: { contains: searchQuery } },
      { category: { name: { contains: searchQuery } } }
    ]
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <ProductsPageClient 
      products={products}
      categories={categories}
      activeCategory={activeCategoryParam}
      isReseller={isReseller}
    />
  )
}
