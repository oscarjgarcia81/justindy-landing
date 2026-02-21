'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, X, AlertCircle, Loader } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import LavaLampBackground from '@/components/LavaLampBackground'

function ContactForm() {
  const searchParams = useSearchParams()
  const automationQuery = searchParams.get('automation')

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    preferredDate: getTodayDate(),
    preferredTime: '',
    message: '',
  })

  // Pre-fill message if automation query is present
  useEffect(() => {
    if (automationQuery) {
      setFormData(prev => ({
        ...prev,
        message: `I'm looking to automate: ${automationQuery}`
      }))
    }
  }, [automationQuery])

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = new Date()
        time.setHours(hour, minute, 0)
        const formatted = time.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        slots.push(formatted)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to submit form. Please try again.')
        return
      }

      setSuccessMessage(data.message || "Thanks! I'll be in touch within 24 hours.")
      setFormData({ name: '', email: '', company: '', preferredDate: getTodayDate(), preferredTime: '', message: '' })

      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    'Free consultation',
    'Custom automation strategy',
    'No credit card required',
    '100% confidential',
  ]

  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="text-center space-y-2 sm:space-y-3 mb-8 px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Let's talk automation
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto">
          Schedule a free 15-minute consultation. We'll discuss your workflows and create a custom strategy.
        </p>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Benefits */}
        <motion.div
          className="lg:col-span-1 space-y-2 sm:space-y-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-base sm:text-lg font-bold text-white">Why call?</h2>
          <div className="space-y-1.5 sm:space-y-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-start gap-1.5 sm:gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-xs sm:text-sm">{benefit}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pt-2 sm:pt-3 border-t border-white/10 space-y-1.5 sm:space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex justify-between text-sm sm:text-base">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">100+</div>
                <p className="text-gray-500 text-xs">Transformed</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">99.8%</div>
                <p className="text-gray-500 text-xs">Uptime</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="lg:col-span-2 bg-[#111111] rounded-3xl p-4 sm:p-5 md:p-6 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative z-10">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Schedule 15-minute consultation</h3>

            {successMessage && (
              <motion.div
                className="mb-4 p-3 bg-white/10 border border-white/20 rounded-lg flex items-start gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium">Success!</p>
                  <p className="text-xs text-gray-400">{successMessage}</p>
                </div>
                <button onClick={() => setSuccessMessage('')} className="ml-auto flex-shrink-0">
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-400 font-medium">Error</p>
                  <p className="text-xs text-red-300/80">{errorMessage}</p>
                </div>
                <button onClick={() => setErrorMessage('')} className="ml-auto flex-shrink-0">
                  <X className="w-4 h-4 text-red-400 hover:text-red-300" />
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Full Name {validationErrors.name && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 sm:py-2.5 bg-[#1A1A1A] border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm ${
                      validationErrors.name
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-white/10 focus:border-white/30'
                    }`}
                    placeholder="John Doe"
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-red-400 mt-1">{validationErrors.name}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Email {validationErrors.email && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-[#1A1A1A] border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm ${
                      validationErrors.email
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-white/10 focus:border-white/30'
                    }`}
                    placeholder="john@example.com"
                  />
                  {validationErrors.email && (
                    <p className="text-xs text-red-400 mt-1">{validationErrors.email}</p>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Company (optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
                  placeholder="Your company"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.515 }}
              >
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Preferred Meeting Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.525 }}
              >
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Preferred Meeting Time (optional)
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
                >
                  <option value="">Select a time slot...</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  What are you looking to automate? (optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors resize-none text-sm"
                  placeholder="Tell us about your challenges..."
                />
              </motion.div>

              <div className="space-y-2 pt-2">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-2xl bg-white text-[#0A0A0A] font-bold text-sm sm:text-base hover:bg-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Schedule Consultation'
                  )}
                </motion.button>
              </div>

              <p className="text-xs text-gray-600 text-center">
                No credit card required • We respect your privacy
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default function GetStarted() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#0A0A0A]">
      <LavaLampBackground />
      
      {/* Header */}
      <motion.header
        className="w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 text-gray-400" />
              <span className="font-bold text-sm text-white">Back</span>
            </motion.div>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-sm text-white hidden sm:inline">Justin Dy</span>
          </div>
          <div className="w-10" />
        </nav>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <Loader className="w-8 h-8 text-white animate-spin" />
            </div>
          }>
            <ContactForm />
          </Suspense>
        </motion.div>
      </div>
    </main>
  )
}
