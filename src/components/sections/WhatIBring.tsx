'use client'

import { motion } from 'framer-motion'
import { Lock, Target, DollarSign, MessageCircle } from 'lucide-react'
import DynamicBackground from '../DynamicBackground'

const benefits = [
  {
    id: 1,
    icon: Lock,
    title: 'Secure Installation',
    description: 'Enterprise-grade setup & onboarding',
    gradient: 'from-blue-900 to-blue-950',
  },
  {
    id: 2,
    icon: Target,
    title: 'Highly Customized',
    description: 'Built specifically for your needs',
    gradient: 'from-purple-900 to-purple-950',
  },
  {
    id: 3,
    icon: DollarSign,
    title: 'Cost Optimized',
    description: 'Maximum ROI for your budget',
    gradient: 'from-emerald-900 to-emerald-950',
  },
  {
    id: 4,
    icon: MessageCircle,
    title: 'Dedicated Support',
    description: 'Expert consulting always available',
    gradient: 'from-amber-900 to-amber-950',
  },
]

interface BenefitCardProps {
  benefit: (typeof benefits)[0]
  index: number
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
  const Icon = benefit.icon

  return (
    <motion.div
      className="rounded-lg border border-gray-800 hover:border-gray-700 transition-colors overflow-hidden relative group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.02, borderColor: '#e5e7eb' }}
    >
      {/* Dynamic background for card */}
      <DynamicBackground
        gradient={benefit.gradient}
        overlayOpacity={75}
        className="h-full"
      >
        <div className="p-6 space-y-3">
          {/* Icon */}
          <motion.div
            className="w-10 h-10 rounded-md bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-lg font-bold text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.08 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {benefit.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.12 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {benefit.description}
          </motion.p>
        </div>
      </DynamicBackground>
    </motion.div>
  )
}

export default function WhatIBring() {
  return (
    <section id="what-i-bring" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      {/* Floating orbs - subtle accents */}
      <motion.div
        className="absolute top-1/2 -left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 opacity-5 blur-3xl"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 opacity-5 blur-3xl"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            What I Bring
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Everything you need for a successful AI implementation
          </p>
        </motion.div>

        {/* Benefits Grid - 2x2 responsive */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
