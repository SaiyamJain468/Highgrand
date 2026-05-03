import { prisma } from "@/lib/prisma"
import Hero from "@/components/public/Hero"
import StatsStrip from "@/components/public/StatsStrip"
import CategoryShowcase from "@/components/public/CategoryShowcase"
import FeaturedProducts from "@/components/public/FeaturedProducts"
import HomeSections from "@/components/public/HomeSections"
import { TestimonialCarousel, BottomCTA } from "@/components/public/TestimonialsCTA"
import SkewSection from "@/components/public/SkewSection"

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE" },
    orderBy: { displayOrder: "asc" },
    take: 3
  })

  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" }
  })

  const banners = await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" }
  })

  const settings = await prisma.siteSettings.findMany()
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)
  
  return (
    <>
      <Hero banners={banners} whatsappNumberProp={settingsMap["whatsappNumber"]} />
      <SkewSection>
        <StatsStrip />
      </SkewSection>
      <SkewSection>
        <CategoryShowcase categories={categories} />
      </SkewSection>
      <SkewSection>
        <FeaturedProducts />
      </SkewSection>
      <SkewSection>
        <HomeSections />
      </SkewSection>
      <SkewSection>
        <TestimonialCarousel testimonials={testimonials} />
      </SkewSection>
      <SkewSection>
        <BottomCTA />
      </SkewSection>
    </>
  )
}
