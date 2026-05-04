import Navbar from "@/components/public/Navbar"
import Footer from "@/components/public/Footer"
import WhatsAppButton from "@/components/public/WhatsAppButton"
import TopMarquee from "@/components/public/TopMarquee"
import CustomCursor from "@/components/public/CustomCursor"
import SmoothScroll from "@/components/public/SmoothScroll"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"


export const metadata: Metadata = {
  title: {
    template: "%s | HIGHGRAND — Premium Apparel Manufacturer",
    default: "HIGHGRAND — Heavyweight Blanks & Luxury Apparel Manufacturing Delhi",
  },
  description: "India's leading B2B apparel manufacturer specializing in heavyweight blanks, oversized tees, and luxury street wear. 12+ years of industrial precision with zero MOQ for resellers.",
  openGraph: {
    title: "HIGHGRAND — Premium Apparel Manufacturer",
    description: "Industrial scale manufacturing for independent fashion brands. Zero MOQ. Factory direct from Delhi.",
    url: "https://highgrand.in",
    siteName: "Highgrand",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  verification: {
    google: "-3vklbLgODIgvmvssG-8YzXReb6Wv13BTT8OrMPjw4M",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Attempt to fetch settings with a 5-second timeout to prevent 504 Gateway Time-out
  let settingsMap: Record<string, string> = {
    "announcementText": "Database connection timeout - Check Hostinger IP / Firewall",
    "whatsappNumber": ""
  };
  try {
    const settingsPromise = prisma.siteSettings.findMany();
    const timeoutPromise = new Promise<any[]>((_, reject) => 
      setTimeout(() => reject(new Error("Database connection timed out after 5 seconds")), 5000)
    );
    const settings = await Promise.race([settingsPromise, timeoutPromise]);
    settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (err) {
    console.error("Layout settings fetch failed:", err);
  }

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        <CustomCursor />
        <TopMarquee announcement={settingsMap["announcementText"]} />
        <Navbar />
        <main className="flex-1 relative z-10 overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <WhatsAppButton numberProp={settingsMap["whatsappNumber"]} />
      </div>
    </SmoothScroll>
  )
}
