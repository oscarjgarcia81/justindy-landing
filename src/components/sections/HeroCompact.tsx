'use client'

import { motion } from 'framer-motion'
import { Users, Brain, TrendingUp, Headphones, Lock, DollarSign, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Services data
const services = [
  {
    id: 1,
    icon: Brain,
    title: 'Personal AI Assistant',
    subtitle: 'Proactive intelligence—reaches out first, manages emails, calendars, organizes your entire day',
  },
  {
    id: 2,
    icon: Users,
    title: 'AI-Powered Lead Generation',
    subtitle: 'Gather high-quality leads 24/7 across every channel',
  },
  {
    id: 3,
    icon: Headphones,
    title: 'Database Management',
    subtitle: 'Automated data entry, CRM upkeep, PO generation, and complete data maintenance',
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Business Analytics Dashboard',
    subtitle: 'Real-time insights on your business, industry trends, and competitive landscape',
  },
]

// Benefits data
const benefits = [
  {
    id: 1,
    icon: TrendingUp,
    title: 'Same-Day, Hassle-Free Setup',
    subtitle: 'Live and running without the worry—you focus on your business',
  },
  {
    id: 2,
    icon: Lock,
    title: 'Secure Installation',
    subtitle: 'Enterprise-grade security, your data stays yours',
  },
  {
    id: 3,
    icon: Brain,
    title: 'Performance-Optimized Agent',
    subtitle: 'Built for speed, reliability, and scale',
  },
  {
    id: 4,
    icon: DollarSign,
    title: '95% Cheaper Onboarding',
    subtitle: 'No enterprise pricing, just real results',
  },
]

// Column component for Services
function ServicesColumn() {
  return (
    <motion.div
      className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-light text-white mb-6 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Popular Services
        </motion.h2>

        <div className="space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                className="flex items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 8, opacity: 0.8 }}
              >
                <motion.div
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mt-1 border border-blue-500 border-opacity-20"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-400" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {service.subtitle}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// Column component for CTA
function CTAColumn() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.div
        className="text-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
          Professional AI Deployment
          <span className="block text-blue-400 mt-2 md:mt-3 lg:mt-4">
            For Your Business
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 max-w-md">
          From consultation to live deployment. I handle the complexity, you get the results.
        </p>
      </motion.div>

      <Link href="/get-started" className="w-full max-w-xs px-4 sm:px-0">
        <motion.button
          className="w-full px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl bg-white text-black font-bold text-base sm:text-lg md:text-lg lg:text-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl border-2 border-blue-500 border-opacity-0 hover:border-opacity-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Free
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </Link>

      <motion.div
        className="pt-1 md:pt-2 text-center text-xs sm:text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p className="text-gray-400 flex items-center justify-center gap-2">
          <span>✓</span> 100+ Businesses Already Scaling
        </p>
      </motion.div>
    </motion.div>
  )
}

// Column component for Benefits
function BenefitsColumn() {
  return (
    <motion.div
      className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-light text-white mb-6 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Why Me?
        </motion.h2>

        <div className="space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.id}
                className="flex items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 group cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: -8, opacity: 0.8 }}
              >
                <motion.div
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mt-1 border border-blue-500 border-opacity-20"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-400" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {benefit.subtitle}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroCompact() {
  return (
    <section className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center items-center px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-0">
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />

      <div className="relative z-10 w-full flex items-center justify-center">
        {/* Main 3-column grid - centered both vertically and horizontally */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-20 w-full max-w-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column - Services */}
          <div className="flex items-center justify-center">
            <ServicesColumn />
          </div>

          {/* Center Column - CTA */}
          <div className="flex items-center justify-center">
            <CTAColumn />
          </div>

          {/* Right Column - Benefits */}
          <div className="flex items-center justify-center">
            <BenefitsColumn />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile, shown on lg and up */}
      <motion.div
        className="hidden lg:flex absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-gray-500 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
