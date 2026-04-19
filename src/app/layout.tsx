import type { Metadata } from 'next';
import { Inter, Bebas_Neue, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500', '600'] });
const bebas = Bebas_Neue({ subsets: ['latin'], variable: '--font-bebas', weight: '400' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', style: 'italic' });

export const metadata: Metadata = {
  title: 'HIGHGRAND — Premium Apparel Manufacturer',
  description: 'Wholesale oversized apparel for resellers, boutiques & online brands across India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} ${playfair.variable} bg-brand-black text-brand-white font-inter overflow-x-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
