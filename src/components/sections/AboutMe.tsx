'use client'

import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { useState } from 'react'

export default function AboutMe() {
  const [headshot, setHeadshot] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setHeadshot(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section id="about-me" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Photo - Left side on desktop, top on mobile */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Circular container for headshot */}
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              {/* Grey placeholder circle */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center overflow-hidden relative group">
                {headshot ? (
                  <img
                    src={headshot}
                    alt="Headshot"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-12 h-12 text-gray-400" />
                    <span className="text-gray-400 text-sm font-medium">Add Photo</span>
                  </div>
                )}

                {/* Upload overlay on hover */}
                <label className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="text-white text-sm font-medium">Change Photo</span>
                </label>
              </div>

              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gray-700 opacity-50" />
            </div>
          </motion.div>

          {/* Bio - Right side on desktop, bottom on mobile */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                About Me
              </h2>
              <div className="w-12 h-1 bg-white rounded-full mb-6" />
            </div>

            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              I'm a junior business analyst in the business process automation industry with a strong foundation in AI. 
              I help small business owners automate their workflows and optimize operations by leveraging AI-driven solutions. 
              My approach combines process analysis with emerging technology to deliver measurable improvements in efficiency, 
              cost reduction, and scalability.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
                  Expertise
                </p>
                <p className="text-gray-300">Process Automation, AI Integration, Business Analysis</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
                  Specializes In
                </p>
                <p className="text-gray-300">Lead Generation, Sales Automation, Support AI</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
