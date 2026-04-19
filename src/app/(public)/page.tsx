import Hero from "@/components/public/Hero"
import StatsStrip from "@/components/public/StatsStrip"
import CategoryShowcase from "@/components/public/CategoryShowcase"
import FeaturedProducts from "@/components/public/FeaturedProducts"
import HomeSections from "@/components/public/HomeSections"
import { TestimonialCarousel, BottomCTA } from "@/components/public/TestimonialsCTA"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <HomeSections />
      <TestimonialCarousel />
      <BottomCTA />
    </>
  )
}
