'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/get-started?automation=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 lg:px-8">
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="text-left">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none"
            >
              Professional<br />
              <span className="text-white">AI Deployment.</span>
            </motion.h1>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mb-6"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What do you need automated?"
                  className="w-full px-6 py-4 bg-[#1A1A1A] border border-white/10 rounded-full text-white placeholder-[#666666] focus:outline-none focus:border-white/30 transition-colors pr-14"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-[#666666] hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/get-started">
                <motion.button
                  className="group flex items-center gap-2 px-8 py-3 bg-white text-[#0A0A0A] rounded-full font-semibold text-sm hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  GET STARTED
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="#services">
                <motion.button
                  className="group flex items-center gap-1 px-6 py-3 border border-white/30 text-white rounded-full font-medium text-sm hover:bg-white/5 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  see more
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Secondary Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:block text-right"
          >
            {/* Logo Mark */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6 ml-auto">
              <span className="text-3xl font-bold text-white">J</span>
            </div>

            {/* Secondary Heading */}
            <h2 className="text-3xl font-bold text-white mb-4">
              For your business.
            </h2>

            {/* Description */}
            <p className="text-[#888888] text-base leading-relaxed max-w-sm ml-auto">
              From consultation to live deployment. I handle the complexity, 
              you get the results. Join 100+ businesses already scaling with AI.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
