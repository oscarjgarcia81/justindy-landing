'use client'

import { useState, useEffect } from 'react'

/**
 * BackgroundAnimation Component
 * 
 * Renders a scroll-based gradient fade background with blue theme
 * - Starts: Dark grey with subtle blue at top (hero)
 * - Fades: Gradually transitions through blue tones as you scroll
 * - Ends: Blue-black gradient at bottom
 * - Dynamic color shift based on scroll progress
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

  // Dynamic color interpolation based on scroll progress
  // Top: Dark grey with blue tint
  // Middle: Blue-infused greys
  // Bottom: Blue-black gradient
  const startColor = '#0f1419'      // Very dark with blue tint
  const topMidColor = '#1a202c'     // Dark grey-blue
  const midColor = '#2d3748'        // Medium with blue
  const bottomMidColor = '#1a1f3a'  // Blue-dark blend
  const endColor = '#0d1117'        // Blue-black

  // Create dynamic gradient that shifts with scroll
  // Lower half gets more blue as you scroll
  const blueInfluence = Math.min(scrollProgress * 1.5, 1)
  
  // Dynamic color for bottom half
  const bottomColor = scrollProgress > 0.5 
    ? `rgba(${13 + 42 * blueInfluence}, ${17 + 38 * blueInfluence}, ${23 + 66 * blueInfluence}, 1)`
    : endColor

  return (
    <>
      {/* Fixed full-screen background container with scroll-based dynamic gradient */}
      <div 
        className="fixed top-0 left-0 z-0 pointer-events-none overflow-hidden" 
        style={{ 
          width: '100vw', 
          height: '100vh',
          inset: 0,
          background: `linear-gradient(135deg, 
            ${startColor} 0%, 
            ${topMidColor} 25%,
            ${midColor} 50%, 
            ${bottomMidColor} ${70 + scrollProgress * 20}%,
            ${bottomColor} 100%)`,
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Dynamic overlay that shifts with scroll - more blue tint at bottom */}
      <div
        className="fixed top-0 left-0 z-0 pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          inset: 0,
          background: `linear-gradient(
            to bottom, 
            transparent 0%,
            rgba(59, 130, 246, ${scrollProgress * 0.15}) ${50 + scrollProgress * 20}%,
            rgba(29, 31, 59, ${0.4 + scrollProgress * 0.4}) 100%
          )`,
        }}
      />

      {/* Content spacer - ensures content appears on top */}
      <div className="relative z-20" />
    </>
  )
}
