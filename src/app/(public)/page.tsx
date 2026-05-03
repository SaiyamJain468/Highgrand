import { prisma } from "@/lib/prisma"
import Hero from "@/components/public/Hero"
import StatsStrip from "@/components/public/StatsStrip"
import CategoryShowcase from "@/components/public/CategoryShowcase"
import FeaturedProducts from "@/components/public/FeaturedProducts"
import HomeSections from "@/components/public/HomeSections"
import { TestimonialCarousel, BottomCTA } from "@/components/public/TestimonialsCTA"
import SkewSection from "@/components/public/SkewSection"

export default async function Home() {
  let categories: any[] = [];
  let testimonials: any[] = [];
  let banners: any[] = [];
  let settingsMap: Record<string, string> = { "whatsappNumber": "" };

  try {
    const dbPromise = Promise.all([
      prisma.category.findMany({ where: { status: "ACTIVE" }, orderBy: { displayOrder: "asc" }, take: 3 }),
      prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
      prisma.banner.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
      prisma.siteSettings.findMany()
    ]);
    const timeoutPromise = new Promise<any[]>((_, reject) => 
      setTimeout(() => reject(new Error("Database connection timed out after 5 seconds")), 5000)
    );
    const [c, t, b, s] = await Promise.race([dbPromise, timeoutPromise]);
    categories = c;
    testimonials = t;
    banners = b;
    settingsMap = s.reduce((acc: Record<string, string>, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (err) {
    console.error("Homepage DB fetch failed:", err);
  }
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
