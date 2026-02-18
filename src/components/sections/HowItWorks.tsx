'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    id: 1,
    title: 'Analyze',
    description: 'We audit your workflows and identify where you\'re losing time.',
  },
  {
    id: 2,
    title: 'Design',
    description: 'Custom AI solution tailored to your business needs.',
  },
  {
    id: 3,
    title: 'Deploy',
    description: '24/7 monitoring and continuous optimization.',
  },
]

interface StepCardProps {
  step: (typeof steps)[0]
  index: number
}

function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Step number circle */}
      <motion.div
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-3xl bg-gradient-to-br from-gray-700 to-gray-800 text-white text-lg sm:text-2xl font-bold flex items-center justify-center mb-4 sm:mb-6 mx-auto border-2 border-blue-500 border-opacity-20"
        whileHover={{ scale: 1.1, opacity: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {step.id}
      </motion.div>

      {/* Content */}
      <div className="text-center space-y-2 sm:space-y-3">
        <motion.h3
          className="text-base sm:text-lg md:text-xl font-bold text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {step.title}
        </motion.h3>

        <motion.p
          className="text-gray-400 text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {step.description}
        </motion.p>
      </div>

      {/* Connector line to next (except last) */}
      {index < steps.length - 1 && (
        <motion.div
          className="absolute -right-full top-8 w-full h-0.5 hidden lg:block"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(100, 116, 139, 0.3), transparent)',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        />
      )}
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-3">
            How It Works
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Three simple steps to automate your business
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
