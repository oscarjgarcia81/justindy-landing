'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface Blob {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
}

const blobs: Blob[] = [
  { id: 1, x: 20, y: 20, size: 400, color: 'rgba(255,255,255,0.04)', delay: 0 },
  { id: 2, x: 70, y: 40, size: 500, color: 'rgba(255,255,255,0.03)', delay: 0.2 },
  { id: 3, x: 40, y: 70, size: 350, color: 'rgba(255,255,255,0.035)', delay: 0.4 },
  { id: 4, x: 80, y: 80, size: 450, color: 'rgba(255,255,255,0.025)', delay: 0.6 },
  { id: 5, x: 10, y: 60, size: 300, color: 'rgba(255,255,255,0.03)', delay: 0.8 },
  { id: 6, x: 60, y: 15, size: 380, color: 'rgba(255,255,255,0.045)', delay: 1 },
]

export default function LavaLampBackground() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Smooth spring animation for scroll
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#0A0A0A]">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-[#0A0A0A]" />
      
      {/* Lava lamp blobs */}
      {blobs.map((blob) => (
        <LavaBlob
          key={blob.id}
          blob={blob}
          scrollProgress={smoothScroll}
        />
      ))}

      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

function LavaBlob({ blob, scrollProgress }: { blob: Blob; scrollProgress: any }) {
  // Each blob moves differently based on scroll
  const yOffset = useTransform(
    scrollProgress,
    [0, 1],
    [0, -150 + blob.id * 30]
  )

  const xOffset = useTransform(
    scrollProgress,
    [0, 1],
    [0, (blob.id % 2 === 0 ? 50 : -50)]
  )

  const scale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [1, 1.1 + blob.id * 0.05, 1]
  )

  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        left: `${blob.x}%`,
        top: `${blob.y}%`,
        width: blob.size,
        height: blob.size,
        backgroundColor: blob.color,
        x: xOffset,
        y: yOffset,
        scale,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        delay: blob.delay,
        ease: 'easeOut',
      }}
    >
      {/* Inner glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${blob.color.replace(/[\d.]+\)$/, '0.1)')} 0%, transparent 50%)`,
        }}
      />
    </motion.div>
  )
}
