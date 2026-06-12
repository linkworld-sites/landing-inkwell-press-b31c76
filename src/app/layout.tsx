import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pressed & Co. — Artisan Letterpress Printing',
  description:
    'Hand-set, hand-inked letterpress printing. Bespoke wedding suites, cards, and art prints made to order on cotton paper.',
  openGraph: {
    title: 'Pressed & Co.',
    description: 'Not printed. Pressed.',
    images: ['/images/hero.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-bone text-press-black font-body">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
