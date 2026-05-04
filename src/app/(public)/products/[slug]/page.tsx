import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import ProductDetails from "@/components/public/ProductDetails"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"

export const revalidate = 3600; // Cache for 1 hour

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true },
    take: 20 // Pre-render top 20 products
  })

  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const paramsResolved = await params
  const product = await prisma.product.findUnique({
    where: { slug: paramsResolved.slug },
    select: { name: true, shortDescription: true, images: true }
  })

  if (!product) return { title: "Product Not Found" }

  const images = product.images ? JSON.parse(product.images) : []

  return {
    title: `${product.name} | Highgrand Manufacturing`,
    description: product.shortDescription,
    openGraph: {
      images: images[0] ? [images[0]] : [],
    },
  }
}

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
