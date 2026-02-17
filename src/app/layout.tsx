import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Justin Dy - AI Automation for Growing Businesses',
  description: 'Custom AI automation solutions. Automate lead generation, sales follow-ups, and customer support. Scale your business faster with intelligent AI systems.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
