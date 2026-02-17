'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          Ready to Transform Your Business?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          Join 100+ businesses automating their workflows and scaling with AI.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex justify-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Link href="/get-started">
            <motion.button
              className="px-10 py-4 rounded-lg bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Consultation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
