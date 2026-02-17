'use client'

import { motion } from 'framer-motion'
import { Users, Brain, TrendingUp, Headphones } from 'lucide-react'
import DynamicBackground from '../DynamicBackground'

const features = [
  {
    id: 1,
    icon: Users,
    title: 'AI Lead Generation',
    description: 'Find and qualify leads automatically.',
    gradient: 'from-blue-900 to-blue-950',
  },
  {
    id: 2,
    icon: Brain,
    title: 'Personal AI Assistant',
    description: 'Automate daily tasks and workflows.',
    gradient: 'from-purple-900 to-purple-950',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Sales Follow-up',
    description: 'Never let a deal slip through.',
    gradient: 'from-green-900 to-green-950',
  },
  {
    id: 4,
    icon: Headphones,
    title: 'Support Bot',
    description: 'AI answers customer questions.',
    gradient: 'from-orange-900 to-orange-950',
  },
]

interface FeatureCardProps {
  feature: (typeof features)[0]
  index: number
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon

  return (
    <motion.div
      className="rounded-xl border border-gray-800 hover:border-gray-700 transition-colors overflow-hidden relative group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.02, borderColor: '#e5e7eb' }}
    >
      {/* Dynamic background for card */}
      <DynamicBackground
        gradient={feature.gradient}
        overlayOpacity={75}
        className="h-full"
      >
        <div className="p-8 space-y-4">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {feature.description}
        </motion.p>
        </div>
      </DynamicBackground>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/2 -right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 opacity-5 blur-3xl"
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
