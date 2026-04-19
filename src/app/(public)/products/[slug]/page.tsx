import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import ProductDetails from "@/components/public/ProductDetails"
// import prisma from "@/lib/prisma"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions)
  const paramsResolved = await params
  const isReseller = session?.user?.role === "RESELLER" && session?.user?.status === "APPROVED"
  const isPending = session?.user?.role === "RESELLER" && session?.user?.status === "PENDING"

  // Fallback product data since Prisma is bypassed for now
  const product = { 
    id: '1', 
    name: 'Premium Oversized T-Shirt - Black', 
    slug: 'premium-oversized-black', 
    longDescription: 'Our signature oversized fit crafted from premium combed cotton. Dropped shoulders, wide sleeves, and a heavy drape that feels luxurious. Reactive dyed to ensure it stays pitch black wash after wash.',
    category: { name: 'Oversized T-Shirts', slug: 'oversized-tshirts' }, 
    images: '["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"]',
    sizes: '["S", "M", "L", "XL", "XXL"]',
    colors: '[{"name": "Black", "hex": "#000000" }, {"name": "White", "hex": "#FFFFFF" }]',
    gsm: 220, 
    composition: '100% Super Combed Cotton', 
    weave: 'Single Jersey',
    finish: 'Bio-washed & Pre-shrunk',
    washCare: 'Machine wash cold inside out. Do not bleach. Tumble dry low or hang dry to prevent shrinkage. Do not iron directly on print if any.',
    moqNote: 'No minimum order required.',
    mrpLabel: '₹850/piece', 
    wholesaleLabel: '₹420/piece' 
  }

  return (
    <div className="bg-brand-black min-h-screen">
      <ProductDetails product={product} isReseller={isReseller} isPending={isPending} />
    </div>
  )
}
