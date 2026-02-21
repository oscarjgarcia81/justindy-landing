'use client'

import { motion } from 'framer-motion'
import { Briefcase, Target, FileText, BarChart3 } from 'lucide-react'

const services = [
  {
    icon: Briefcase,
    title: 'Personal AI Assistant',
    description: 'Your own AI assistant that handles scheduling, emails, and routine tasks 24/7.',
  },
  {
    icon: Target,
    title: 'AI-Powered Lead Generation',
    description: 'Automated lead capture, qualification, and nurturing to grow your pipeline.',
  },
  {
    icon: FileText,
    title: 'Database Management',
    description: 'Smart data organization, automated backups, and instant retrieval systems.',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics Dashboard',
    description: 'Real-time insights and automated reporting to make data-driven decisions.',
  },
]

export default function Services() {
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
          Popular Services
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-3 md:p-6 rounded-xl md:rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#0A0A0A] flex items-center justify-center mb-3 md:mb-5 group-hover:bg-[#2A2A2A] transition-colors">
                <service.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-sm md:text-lg mb-1 md:mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#AAAAAA] text-xs md:text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
