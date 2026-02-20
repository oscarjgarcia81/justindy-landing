'use client'

import { useEffect, useRef } from 'react'

export default function LiquidGlassBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Create gradient blobs
    const blobs = [
      { x: 0.3, y: 0.3, radius: 0.4, color: 'rgba(255, 255, 255, 0.03)', speed: 0.0003 },
      { x: 0.7, y: 0.6, radius: 0.5, color: 'rgba(255, 255, 255, 0.02)', speed: 0.0004 },
      { x: 0.5, y: 0.8, radius: 0.3, color: 'rgba(255, 255, 255, 0.025)', speed: 0.0005 },
      { x: 0.2, y: 0.7, radius: 0.35, color: 'rgba(255, 255, 255, 0.02)', speed: 0.00035 },
    ]

    const render = () => {
      time += 1

      // Clear with base color
      ctx.fillStyle = '#0A0A0A'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw moving gradient blobs
      blobs.forEach((blob, index) => {
        const offsetX = Math.sin(time * blob.speed + index) * 0.1
        const offsetY = Math.cos(time * blob.speed * 0.7 + index) * 0.1
        
        const x = (blob.x + offsetX) * canvas.width
        const y = (blob.y + offsetY) * canvas.height
        const radius = blob.radius * Math.min(canvas.width, canvas.height)

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, '0.01)'))
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add subtle noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 3
        data[i] = Math.max(0, Math.min(255, data[i] + noise))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
      }
      ctx.putImageData(imageData, 0, 0)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: '#0A0A0A' }}
    />
  )
}
