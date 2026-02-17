'use client'

import { useEffect, useRef, useState } from 'react'

interface DynamicBackgroundProps {
  /** Video source URL (free CDN: Pexels, Pixabay, or custom) */
  videoUrl?: string
  /** Image source URL for fallback/static backgrounds */
  imageUrl?: string
  /** Fallback gradient (default to section color) */
  gradient?: string
  /** Overlay opacity (0-100) to darken video/image for text readability */
  overlayOpacity?: number
  /** Whether to loop the video */
  loop?: boolean
  /** Whether to autoplay the video */
  autoplay?: boolean
  /** CSS object-fit property */
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
  /** Additional CSS classes */
  className?: string
  /** Child content */
  children?: React.ReactNode
}

/**
 * DynamicBackground Component
 * 
 * Reusable background component that supports:
 * - HTML5 video backgrounds with lazy loading
 * - Image backgrounds
 * - Fallback gradients
 * - Overlay opacity for text readability
 * - GPU acceleration and responsive sizing
 * 
 * @example
 * <DynamicBackground
 *   videoUrl="https://cdn.example.com/hero-video.mp4"
 *   gradient="from-black to-gray-950"
 *   overlayOpacity={60}
 * >
 *   Your content here
 * </DynamicBackground>
 */
export default function DynamicBackground({
  videoUrl,
  imageUrl,
  gradient = 'from-black to-gray-900',
  overlayOpacity = 50,
  loop = true,
  autoplay = true,
  objectFit = 'cover',
  className = '',
  children,
}: DynamicBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  // Handle video load and error events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleError = () => {
      console.warn(`Failed to load video: ${videoUrl}`)
      setVideoError(true)
    }

    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('error', handleError)
    }
  }, [videoUrl])

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Video Background */}
      {videoUrl && !videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover video-bg animate-gpu"
          style={{
            objectFit: objectFit,
          }}
          autoPlay={autoplay}
          muted
          loop={loop}
          playsInline
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23000000' width='1' height='1'/%3E%3C/svg%3E"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Image Background (fallback or alternative) */}
      {imageUrl && (videoError || !videoUrl) && (
        <img
          src={imageUrl}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover animate-gpu"
          style={{
            objectFit: objectFit,
          }}
        />
      )}

      {/* Gradient Fallback */}
      {(!videoUrl && !imageUrl) || videoError ? (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      ) : null}

      {/* Dark Overlay for Text Readability */}
      <div
        className="absolute inset-0 bg-black animate-gpu"
        style={{
          opacity: overlayOpacity / 100,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}
