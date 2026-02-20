'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, BarChart2, Clock } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: '95% Cheaper Onboarding',
    description: 'No enterprise pricing, just real results.',
  },
  {
    icon: Shield,
    title: 'Secure Installation',
    description: 'Enterprise-grade security, your data stays yours.',
  },
  {
    icon: BarChart2,
    title: 'Performance Optimized',
    description: 'Built for speed, reliability, and maximum efficiency.',
  },
  {
    icon: Clock,
    title: 'Same-Day Setup',
    description: 'Live and running without the worry.',
  },
]

export default function WhyMe() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#888888] text-sm font-medium tracking-widest uppercase mb-12"
        >
          Why Me?
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-5 border border-white/5"
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#888888] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
