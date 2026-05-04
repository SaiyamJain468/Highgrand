import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import ProductDetails from "@/components/public/ProductDetails"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions)
  const paramsResolved = await params
  const isReseller = session?.user?.role === "RESELLER" && session?.user?.status === "APPROVED"
  const isPending = session?.user?.role === "RESELLER" && session?.user?.status === "PENDING"

  const product = await prisma.product.findUnique({
    where: { slug: paramsResolved.slug },
    include: { category: true }
  })

  if (!product || !product.isActive) {
    notFound()
  }

  return (
    <div className="bg-brand-black min-h-screen">
      <ProductDetails product={product} isReseller={isReseller} isPending={isPending} />
    </div>
  )
}
