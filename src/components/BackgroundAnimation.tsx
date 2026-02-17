'use client'

import { useState, useEffect } from 'react'

/**
 * BackgroundAnimation Component
 * 
 * Renders a scroll-based gradient fade background
 * - Starts: Dark grey to medium grey gradient at top (hero)
 * - Fades: Gradually transitions as user scrolls down
 * - Ends: Pure black at footer
 * - Seamless transition across the entire page
 */
export default function BackgroundAnimation() {
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Hydration fix: only render after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll position to fade gradient
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = totalHeight > 0 ? Math.min(scrolled / totalHeight, 1) : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  // Interpolate colors based on scroll progress
  // Start: Dark grey (#1a1a1a) → Medium grey (#404040)
  // End: Black (#000000)
  // Smooth fade as user scrolls
  const startColor = '#1a1a1a'
  const midColor = '#404040'
  const endColor = '#000000'

  // Blend colors based on scroll progress
  // const bgColor = scrollProgress < 0.5
  //   ? startColor // Keep initial gradient at top
  //   : endColor   // Fade to black at bottom

  return (
    <>
      {/* Fixed full-screen background container with scroll-based fade */}
      <div 
        className="fixed top-0 left-0 z-0 pointer-events-none overflow-hidden" 
        style={{ 
          width: '100vw', 
          height: '100vh',
          inset: 0,
          background: `linear-gradient(135deg, ${startColor} 0%, ${midColor} 50%, ${endColor} ${Math.max(50, 50 + scrollProgress * 50)}%)`,
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Full-page overlay for seamless fade effect */}
      <div
        className="fixed top-0 left-0 z-0 pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          inset: 0,
          background: `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, ${scrollProgress * 0.6}) 100%)`,
        }}
      />

      {/* Content spacer - ensures content appears on top */}
      <div className="relative z-20" />
    </>
  )
}
