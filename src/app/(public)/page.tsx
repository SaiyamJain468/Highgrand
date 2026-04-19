import Hero from "@/components/public/Hero"
import StatsStrip from "@/components/public/StatsStrip"
import CategoryShowcase from "@/components/public/CategoryShowcase"
import FeaturedProducts from "@/components/public/FeaturedProducts"
import HomeSections from "@/components/public/HomeSections"
import { TestimonialCarousel, BottomCTA } from "@/components/public/TestimonialsCTA"
import SkewSection from "@/components/public/SkewSection"

export default function Home() {
  return (
    <>
      <Hero />
      <SkewSection>
        <StatsStrip />
      </SkewSection>
      <SkewSection>
        <CategoryShowcase />
      </SkewSection>
      <SkewSection>
        <FeaturedProducts />
      </SkewSection>
      <SkewSection>
        <HomeSections />
      </SkewSection>
      <SkewSection>
        <TestimonialCarousel />
      </SkewSection>
      <SkewSection>
        <BottomCTA />
      </SkewSection>
    </>
  )
}
