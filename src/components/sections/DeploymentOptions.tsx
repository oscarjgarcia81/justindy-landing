'use client'

import { motion } from 'framer-motion'
import { Cloud, Server, Monitor, Check } from 'lucide-react'

const tiers = [
  {
    icon: Cloud,
    name: 'Cloud-Based',
    description: 'Fully managed automation running on secure cloud infrastructure. I handle everything—you just get the results.',
    features: [
      'Fully managed & maintained',
      '99.9% uptime guarantee',
      'Monthly performance reports',
      'No hardware required',
    ],
    bestFor: 'Most businesses',
    pricing: 'From $2,000/mo',
  },
  {
    icon: Server,
    name: 'Hybrid',
    description: 'Automation runs on your existing infrastructure with my ongoing management and optimization.',
    features: [
      'Uses your infrastructure',
      'Ongoing management included',
      'Data stays on your systems',
      'Quarterly optimization reviews',
    ],
    bestFor: 'Enterprise & compliance',
    pricing: 'From $3,500/mo',
  },
  {
    icon: Monitor,
    name: 'In-Office AI System',
    description: 'Premium white-glove setup: Your own dedicated AI machine, fully configured, delivered and installed. Includes comprehensive team training.',
    features: [
      'Dedicated Mac Mini AI system',
      'Complete setup & configuration',
      'On-site team training (2-4 hrs)',
      '90-day support included',
      'Full documentation & best practices',
      'Optional ongoing retainer',
    ],
    bestFor: 'Premium clients',
    pricing: 'From $8,500',
    highlight: true,
  },
]

export default function DeploymentOptions() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#888888] text-sm font-medium tracking-widest uppercase mb-4"
        >
          Deployment Options
        </motion.p>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Setup
          </h2>
          <p className="text-[#AAAAAA] text-lg max-w-2xl">
            From fully managed cloud solutions to your own in-office AI system. 
            You own the automation—I make it work for you.
          </p>
        </motion.div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                tier.highlight
                  ? 'bg-[#1A1A1A] border-2 border-white/20'
                  : 'bg-[#111111] border border-white/5'
              }`}
            >
              {/* Highlight Badge */}
              {tier.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                tier.highlight ? 'bg-white/10' : 'bg-[#1A1A1A]'
              }`}>
                <tier.icon className="w-6 h-6 text-white" />
              </div>

              {/* Name */}
              <h3 className="text-white font-bold text-xl mb-2">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-[#888888] text-sm mb-6 min-h-[60px]">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                    <span className="text-[#AAAAAA] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Best For */}
              <div className="mb-4">
                <span className="text-[#666666] text-xs uppercase tracking-wider">
                  Best for
                </span>
                <p className="text-white text-sm">{tier.bestFor}</p>
              </div>

              {/* Pricing */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-white font-semibold">{tier.pricing}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-[#666666] text-sm mt-12"
        >
          All options include discovery call, custom solution design, and implementation. 
          <span className="text-white"> In-Office AI System</span> is a one-time investment with optional ongoing support.
        </motion.p>
      </div>
    </section>
  )
}
