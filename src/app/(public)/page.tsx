import dynamic from "next/dynamic"
import { prisma, getSiteSettings } from "@/lib/prisma"
import Hero from "@/components/public/Hero"
import StatsStrip from "@/components/public/StatsStrip"
import CategoryShowcase from "@/components/public/CategoryShowcase"
import FeaturedProducts from "@/components/public/FeaturedProducts"
import HomeSections from "@/components/public/HomeSections"
import SkewSection from "@/components/public/SkewSection"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const TestimonialCarousel = dynamic(() => import("@/components/public/TestimonialsCTA").then(mod => mod.TestimonialCarousel));
const BottomCTA = dynamic(() => import("@/components/public/TestimonialsCTA").then(mod => mod.BottomCTA));

export const revalidate = 60; // Enable ISR, regenerate every 60 seconds

export default async function Home() {
  let categories: any[] = [];
  let testimonials: any[] = [];
  let banners: any[] = [];
  let featuredProducts: any[] = [];
  let isReseller = false;
  let settingsMap: Record<string, string> = { "whatsappNumber": "" };

  try {
    const [c, t, b, s, productsData, session] = await Promise.all([
      prisma.category.findMany({ where: { status: "ACTIVE" }, orderBy: { displayOrder: "asc" }, take: 3 }),
      prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
      prisma.banner.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
      getSiteSettings(),
      prisma.product.findMany({
        where: { isActive: true, isFeatured: true },
        orderBy: { displayOrder: "asc" },
        include: { category: true },
        take: 8
      }),
      getServerSession(authOptions).catch(() => null)
    ]);

    categories = c;
    testimonials = t;
    banners = b;
    isReseller = session?.user?.role === "RESELLER" && session?.user?.status === "APPROVED";
    
    // Fallback for featured products if empty
    if (productsData.length === 0) {
      featuredProducts = await prisma.product.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        include: { category: true },
        take: 8
      });
    } else {
      featuredProducts = productsData;
    }

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
        <FeaturedProducts productsProp={featuredProducts} isResellerProp={isReseller} />
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
