'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-[#111111] border border-white/5 p-12 lg:p-16 text-center overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Ready to Transform Your Business?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#888888] text-lg max-w-2xl mx-auto mb-8"
            >
              Join 100+ businesses automating their workflows and scaling with AI.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => scrollToSection('#contact')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0A0A0A] rounded-full font-semibold text-base hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
