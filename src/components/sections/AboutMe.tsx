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
              I'm an AI Integration Specialist and the founder of an 
              AI Deployment Agency helping businesses automate their operations and scale with intelligent solutions. 
              I've spent my career in the data and business analytics industry, 
              working with companies like John Deere to implement data-driven solutions.
            </p>

            <p className="text-[#AAAAAA] text-lg leading-relaxed">
              With a background in Computer Science and Business Analytics, 
              I bring a unique blend of technical expertise and business strategy to every project. My focus is on 
              delivering measurable results—reducing costs, eliminating manual work, and helping companies scale faster 
              through AI-driven automation.
            </p>

            <p className="text-[#AAAAAA] text-lg leading-relaxed">
              I believe in results over time spent—and I build systems that deliver both immediate impact and long-term scalability.
            </p>

            <div className="pt-6">
              <h3 className="text-[#888888] text-sm font-medium tracking-widest uppercase mb-4">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {['AI Deployment', 'Business Automation', 'Process Optimization', 'Data Analytics', 'Competitive Intelligence', 'Lead Generation', 'Workflow Design', 'Business Strategy'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/5 text-white text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-[#888888] text-sm font-medium tracking-widest uppercase mb-4">
                Industry Experience
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Data Analytics</p>
                    <p className="text-[#888888] text-sm">John Deere</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Business Data Analytics</p>
                    <p className="text-[#888888] text-sm">Shorr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Business Analytics</p>
                    <p className="text-[#888888] text-sm">Apache</p>
                  </div>
                </div>
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
