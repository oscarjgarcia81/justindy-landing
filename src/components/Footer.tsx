'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="w-full bg-black border-t border-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-lg text-white">Justin Dy</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#results" className="text-gray-400 hover:text-white transition-colors">
              Results
            </a>
            <a href="mailto:hello@justindy.com" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <p className="text-gray-500 text-xs md:text-sm">
            © {currentYear} Justin Dy
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
