import Navbar from "@/components/public/Navbar"
import Footer from "@/components/public/Footer"
import WhatsAppButton from "@/components/public/WhatsAppButton"
import TopMarquee from "@/components/public/TopMarquee"
import CustomCursor from "@/components/public/CustomCursor"
import SmoothScroll from "@/components/public/SmoothScroll"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | HIGHGRAND — Premium Apparel Manufacturer",
    default: "HIGHGRAND — Heavyweight Blanks & Luxury Apparel Manufacturing Delhi",
  },
  description: "India's leading B2B apparel manufacturer specializing in heavyweight blanks, oversized tees, and luxury street wear. 12+ years of industrial precision with zero MOQ for resellers.",
  openGraph: {
    title: "HIGHGRAND — Premium Apparel Manufacturer",
    description: "Industrial scale manufacturing for independent fashion brands. Zero MOQ. Factory direct from Delhi.",
    url: "https://highgrand.com",
    siteName: "Highgrand",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen relative">
        <CustomCursor />
        <TopMarquee />
        <Navbar />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </SmoothScroll>
  )
}
