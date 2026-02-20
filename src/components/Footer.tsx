'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-sm">J</span>
            </div>
            <span className="text-white font-semibold">Justin Dy</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#888888] text-sm"
          >
            © {currentYear} Justin Dy. All rights reserved.
          </motion.p>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <a href="#" className="text-[#888888] hover:text-white text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[#888888] hover:text-white text-sm transition-colors">
              Terms
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
