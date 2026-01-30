import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Background from '@/components/environment/Background'
import Dock from '@/components/layout/Dock'
import AudioPlayer from '@/components/environment/AudioPlayer'
import { ThemeManager } from '@/components/layout/ThemeManager'
import FocusOverlay from '@/components/flow/FocusOverlay'
import AmbiencePlayer from '@/components/environment/AmbiencePlayer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'QWorkOS - The Vibe',
  description: 'Flow State Productivity Environment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ThemeManager />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <Background />
        <AudioPlayer />
        <AmbiencePlayer />
        <FocusOverlay />
        <main className="relative z-10 w-full min-h-screen p-4 pb-24">
          {children}
        </main>
        <Dock />
      </body>
    </html>
  )
}
