import Navbar from "@/components/public/Navbar"
import Footer from "@/components/public/Footer"
import WhatsAppButton from "@/components/public/WhatsAppButton"
import TopMarquee from "@/components/public/TopMarquee"
import CustomCursor from "@/components/public/CustomCursor"
import SmoothScroll from "@/components/public/SmoothScroll"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <CustomCursor />
        <TopMarquee />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </SmoothScroll>
  )
}
