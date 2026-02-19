'use client'

import { motion } from 'framer-motion'

export default function ProfessionalDeployment() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center px-3 sm:px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-0">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 pointer-events-none" />

      {/* Background accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-8 md:space-y-10 lg:space-y-12">
        <motion.div
          className="text-center space-y-4 md:space-y-6 lg:space-y-8 max-w-5xl px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Main heading */}
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Professional AI Deployment
            <span className="block text-blue-400 mt-2 md:mt-3 lg:mt-4">
              For Your Business
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            From consultation to implementation, I handle the complexity so you get results.
          </motion.p>
        </motion.div>

        {/* Three pillars */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl mt-8 md:mt-12 lg:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            { number: '01', label: 'Assessment', desc: 'Understand your needs' },
            { number: '02', label: 'Implementation', desc: 'Deploy with precision' },
            { number: '03', label: 'Support', desc: 'Ongoing optimization' },
          ].map((pillar, index) => (
            <motion.div
              key={index}
              className="text-center space-y-2 md:space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400">
                {pillar.number}
              </div>
              <div className="text-xl md:text-2xl font-semibold text-white">
                {pillar.label}
              </div>
              <div className="text-sm md:text-base text-gray-400">
                {pillar.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
