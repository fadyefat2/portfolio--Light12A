import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel'
})

export const metadata: Metadata = {
  title: 'Light12A | Indie Game Developer',
  description: 'Interactive Game Developer Portfolio by Light12A - Pixel Art, Arcade Games, and Cinematic Experiences',
  generator: 'v0.app',
  icons: {
    icon: 'https://img.itch.zone/aW1nLzI0MTEwODI4LmpwZw==/80x80%23/Cd4zyB.jpg',
    apple: 'https://img.itch.zone/aW1nLzI0MTEwODI4LmpwZw==/80x80%23/Cd4zyB.jpg',
  },
}

import PixelCursor from '@/components/pixel-cursor'
import CRTOverlay from '@/components/crt-overlay'
import ArcadeBackground from '@/components/arcade-background'
import PageTransition from '@/components/page-transition'

import Navigation from '@/components/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${pressStart2P.className} antialiased selection:bg-primary selection:text-primary-foreground`}>
        <ArcadeBackground />
        <CRTOverlay />
        <PixelCursor />
        <PageTransition />
        <Navigation />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

