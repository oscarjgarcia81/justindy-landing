'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#about-me" className="flex items-center gap-2 cursor-pointer no-underline">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-lg text-white">
              Justin Dy
            </span>
          </motion.div>
        </a>

        {/* Nav Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <motion.a
            href="#how-it-works"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            How It Works
          </motion.a>
          <motion.a
            href="#results"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Results
          </motion.a>
        </div>

        {/* CTA Button */}
        <Link href="/get-started">
          <motion.button
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              isScrolled
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </Link>
      </nav>
    </motion.header>
  )
}
