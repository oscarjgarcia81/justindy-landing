'use client'

import { motion } from 'framer-motion'

export default function AboutMe() {
  return (
    <section id="contact" className="py-24 px-6 lg:px-8 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative J */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 text-[400px] font-bold text-white/[0.02] select-none pointer-events-none leading-none">
        J
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#888888] text-sm font-medium tracking-widest uppercase mb-12"
        >
          About Me
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-[#AAAAAA] text-lg leading-relaxed">
              I am a junior business analyst in the business process automation industry with a strong foundation in AI. I help small businesses streamline their operations by leveraging AI-driven solutions and process analysis.
            </p>

            <p className="text-[#AAAAAA] text-lg leading-relaxed">
              My approach combines technical expertise with a deep understanding of business needs, delivering measurable improvements in efficiency and cost reduction for every client I work with.
            </p>

            <div className="pt-6">
              <h3 className="text-[#888888] text-sm font-medium tracking-widest uppercase mb-4">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {['AI Deployment', 'Process Automation', 'Business Analysis', 'OpenClaw', 'Workflow Optimization'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/5 text-white text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl bg-[#1A1A1A] border border-white/5 overflow-hidden relative">
              {/* Placeholder for Justin's photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white/40">J</span>
                </div>
                <p className="text-[#888888] text-sm mb-2">Photo Placeholder</p>
                <p className="text-[#666666] text-xs">Replace with your photo</p>
                <p className="text-[#444444] text-xs mt-4">Recommended: 800x1000px</p>
              </div>
              
              {/* Uncomment and update path when photo is added */}
              {/* <Image
                src="/images/justin-photo.jpg"
                alt="Justin Dy"
                fill
                className="object-cover"
                priority
              /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
