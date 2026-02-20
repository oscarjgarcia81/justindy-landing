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
  { id: 1, x: 20, y: 20, size: 400, color: 'rgba(255,255,255,0.15)', delay: 0 },
  { id: 2, x: 70, y: 40, size: 500, color: 'rgba(255,255,255,0.12)', delay: 0.2 },
  { id: 3, x: 40, y: 70, size: 350, color: 'rgba(255,255,255,0.18)', delay: 0.4 },
  { id: 4, x: 80, y: 80, size: 450, color: 'rgba(200,200,200,0.1)', delay: 0.6 },
  { id: 5, x: 10, y: 60, size: 300, color: 'rgba(255,255,255,0.14)', delay: 0.8 },
  { id: 6, x: 60, y: 15, size: 380, color: 'rgba(255,255,255,0.16)', delay: 1 },
]

export default function LavaLampBackground() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render static version for SSR
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#0A0A0A]">
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className="absolute rounded-full blur-3xl"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: blob.size,
              height: blob.size,
              backgroundColor: blob.color,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#0A0A0A]">
      {/* Lava lamp blobs */}
      {blobs.map((blob) => (
        <LavaBlob
          key={blob.id}
          blob={blob}
          scrollProgress={smoothScroll}
        />
      ))}
    </div>
  )
}

function LavaBlob({ blob, scrollProgress }: { blob: Blob; scrollProgress: any }) {
  const yOffset = useTransform(
    scrollProgress,
    [0, 1],
    [0, -200 + blob.id * 40]
  )

  const xOffset = useTransform(
    scrollProgress,
    [0, 1],
    [0, (blob.id % 2 === 0 ? 80 : -80)]
  )

  const scale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [1, 1.2, 1.1]
  )

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${blob.x}%`,
        top: `${blob.y}%`,
        width: blob.size,
        height: blob.size,
        background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
        x: xOffset,
        y: yOffset,
        scale,
        filter: 'blur(60px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: blob.delay,
        ease: 'easeOut',
      }}
    />
  )
}
