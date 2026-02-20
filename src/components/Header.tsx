'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Results', href: '#results' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-sm">J</span>
            </div>
            <span className="text-white font-semibold text-lg">Justin Dy</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-[#CCCCCC] hover:text-white transition-colors text-sm font-medium"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="hidden md:block px-5 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#0A0A0A] border-t border-white/5"
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-[#CCCCCC] hover:text-white transition-colors py-2"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full px-5 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white hover:text-[#0A0A0A] transition-all"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
