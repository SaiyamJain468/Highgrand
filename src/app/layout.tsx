import type { Metadata } from 'next';
import { Inter, Bebas_Neue, Playfair_Display } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/public/Preloader';
import { CustomCursor, GrainOverlay, BackgroundAura } from '@/components/public/CinematicEffects';
import SmoothScroll from '@/components/public/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500', '600'] });
const bebas = Bebas_Neue({ subsets: ['latin'], variable: '--font-bebas', weight: '400' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', style: 'italic' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://highgrand.in'),
  title: {
    default: 'HIGHGRAND — Premium Apparel Manufacturer',
    template: '%s | HIGHGRAND'
  },
  description: 'Industrial-grade wholesale oversized apparel for resellers, boutiques & online brands across India. Premium quality, expert craftsmanship.',
  keywords: ['oversized t-shirts', 'wholesale apparel', 'clothing manufacturer India', 'premium streetwear', 'reseller clothing'],
  authors: [{ name: 'Highgrand HQ' }],
  creator: 'Highgrand Manufacturing',
  publisher: 'Highgrand HQ',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://highgrand.in',
    siteName: 'HIGHGRAND',
    title: 'HIGHGRAND — Premium Apparel Manufacturer',
    description: 'Wholesale oversized apparel for resellers & boutiques across India.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HIGHGRAND Premium Manufacturing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIGHGRAND — Premium Apparel Manufacturer',
    description: 'Wholesale oversized apparel for resellers & boutiques across India.',
    images: ['/og-image.png'],
    creator: '@highgrand_hq',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '-3vklbLgODIgvmvssG-8YzXReb6Wv13BTT8OrMPjw4M',
  },
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} ${playfair.variable} bg-brand-black text-brand-white font-inter overflow-x-hidden antialiased`}>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#111',
              color: '#fff',
              border: '1px solid #333',
              borderRadius: '2px',
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }
          }}
        />
        <Preloader />
        <CustomCursor />
        <GrainOverlay />
        <BackgroundAura />
        <SmoothScroll>
          <main className="relative z-0">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
