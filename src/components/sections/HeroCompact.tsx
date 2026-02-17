'use client'

import { motion } from 'framer-motion'
import { Users, Brain, TrendingUp, Headphones, Lock, Target, DollarSign, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Services data
const services = [
  {
    id: 1,
    icon: Users,
    title: 'Lead Generation',
    subtitle: 'Generate qualified leads on autopilot',
  },
  {
    id: 2,
    icon: Brain,
    title: 'Personal AI Assistant',
    subtitle: 'Your AI handles emails, calendar & meetings—you focus on strategy',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Business Analytics Dashboard',
    subtitle: 'Automated daily reports so you see what matters',
  },
  {
    id: 4,
    icon: Headphones,
    title: 'Business Process Automation',
    subtitle: 'Turn repetitive work into instant automation',
  },
]

// Benefits data
const benefits = [
  {
    id: 1,
    icon: Lock,
    title: 'Security-focused Installation',
    subtitle: 'Your data stays safe, your workflows stay secure',
  },
  {
    id: 2,
    icon: Target,
    title: 'Highly Customized',
    subtitle: 'Built exactly for how your business works',
  },
  {
    id: 3,
    icon: DollarSign,
    title: 'Cost Optimized',
    subtitle: '90% cheaper than running it yourself',
  },
  {
    id: 4,
    icon: MessageCircle,
    title: 'Dedicated Support',
    subtitle: "I'm here for guidance and changes whenever you need me",
  },
]

// Column component for Services
function ServicesColumn() {
  return (
    <motion.div
      className="flex flex-col justify-center space-y-8"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div>
        <motion.h2
          className="text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Services
        </motion.h2>

        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                className="flex items-start gap-6 group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 8, opacity: 0.8 }}
              >
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-800 flex items-center justify-center mt-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
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
      className="flex flex-col items-center justify-center space-y-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
          Scale Your Business With AI
        </h1>
        <p className="text-xl text-gray-300 max-w-md">
          Automate workflows. Generate leads. Serve customers 24/7.
        </p>
      </motion.div>

      <Link href="/get-started" className="w-full max-w-xs">
        <motion.button
          className="w-full px-10 py-5 rounded-lg bg-white text-black font-bold text-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Free
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </Link>

      <motion.div
        className="pt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p className="text-base text-gray-400 flex items-center justify-center gap-2">
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
      className="flex flex-col justify-center space-y-8"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div>
        <motion.h2
          className="text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Why Me?
        </motion.h2>

        <div className="space-y-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.id}
                className="flex items-start gap-6 group cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: -8, opacity: 0.8 }}
              >
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-800 flex items-center justify-center mt-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
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
    <section className="relative w-full h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Main 3-column grid - centered both vertically and horizontally */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20 w-full max-w-7xl"
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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
