/**
 * HERO_EXAMPLE.tsx
 * 
 * This is an example of how to use the AnimatedSequences component in your hero section.
 * Copy this code into your hero section component and customize as needed.
 * 
 * Location: src/components/sections/Hero.tsx (or similar)
 */

'use client'

import { motion } from 'framer-motion'
import AnimatedSequences from '@/components/AnimatedSequences'

export default function HeroWithAnimations() {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          {/* Grid layout: Text on left, animations on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left column: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  AI That Works
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {' '}While You Sleep
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Justin AI automates lead generation, meeting scheduling, and customer follow-ups
                  in real-time. Watch your business grow while you focus on closing deals.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 transform hover:scale-105">
                  Start Free Trial
                </button>
                <button className="px-8 py-3 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-200">
                  Watch Demo
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap gap-4 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>24/7 automation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>100% human-like responses</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column: Animations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Grid view - shows all 3 animations side by side */}
              <AnimatedSequences variant="grid" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Alternative: Carousel Hero Layout
 * Shows one animation at a time, rotating through all 3
 */
export function HeroWithCarousel() {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-20 lg:py-32 flex flex-col items-center text-center space-y-12">
          
          {/* Text section */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              AI That Works
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {' '}While You Sleep
              </span>
            </h1>

            <p className="text-xl text-gray-300">
              Justin AI automates lead generation, scheduling, and follow-ups in real-time.
            </p>
          </div>

          {/* Carousel animations */}
          <AnimatedSequences
            variant="carousel"
            autoRotate={true}
            rotationInterval={5000}
          />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-blue-400">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Alternative: Full-width Stacked Layout
 * All 3 animations stacked vertically with descriptions
 */
export function HeroWithStacked() {
  return (
    <section className="relative w-full bg-gradient-to-b from-black via-gray-950 to-black py-20 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              How Justin AI Works
            </h1>
            <p className="text-xl text-gray-300">
              Automation that feels like magic, but it's just smart technology.
            </p>
          </div>

          {/* Stacked animations with descriptions */}
          <div className="grid grid-cols-1 gap-12">
            <AnimatedSequences variant="stacked" />
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
