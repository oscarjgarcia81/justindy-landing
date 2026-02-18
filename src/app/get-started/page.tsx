'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, X, AlertCircle, Loader } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function GetStarted() {
  // Get today's date in YYYY-MM-DD format
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

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Generate 15-minute time slots from 9:00 AM to 5:00 PM
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

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate form before submission
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
    // Clear validation error for this field when user starts typing
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

    // Validate form
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

      // Success
      setSuccessMessage(data.message || 'Thanks! I\'ll be in touch within 24 hours.')
      setFormData({ name: '', email: '', company: '', preferredDate: getTodayDate(), preferredTime: '', message: '' })

      // Clear success message after 5 seconds
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
    <main className="w-full bg-black min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        className="w-full z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800"
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
            <div className="w-7 h-7 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-sm text-white hidden sm:inline">Justin Dy</span>
          </div>
          <div className="w-10" />
        </nav>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          className="max-w-5xl mx-auto h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Section - Compact */}
          <motion.div
            className="text-center space-y-2 sm:space-y-3 mb-4 sm:mb-6 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Let's talk automation
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
              Schedule a free 15-minute consultation. We'll discuss your workflows and create a custom strategy.
            </p>
          </motion.div>

          {/* Two Column Layout - Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Benefits - Condensed */}
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
                    <p className="text-gray-300 text-xs sm:text-sm">{benefit}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stats - Inline */}
              <motion.div
                className="pt-2 sm:pt-3 border-t border-gray-800 space-y-1.5 sm:space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex justify-between text-sm sm:text-base">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">100+</div>
                    <p className="text-gray-400 text-xs">Transformed</p>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">99.8%</div>
                    <p className="text-gray-400 text-xs">Uptime</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Form - Compact */}
            <motion.div
              className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-4 sm:p-5 md:p-6 border border-gray-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Schedule 15-minute consultation</h3>

                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg flex items-start gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-300 font-medium">Success!</p>
                      <p className="text-xs text-green-300/80">{successMessage}</p>
                    </div>
                    <button
                      onClick={() => setSuccessMessage('')}
                      className="ml-auto flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-green-400 hover:text-green-300" />
                    </button>
                  </motion.div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-300 font-medium">Error</p>
                      <p className="text-xs text-red-300/80">{errorMessage}</p>
                    </div>
                    <button
                      onClick={() => setErrorMessage('')}
                      className="ml-auto flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-red-400 hover:text-red-300" />
                    </button>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Full Name {validationErrors.name && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 sm:py-2.5 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors text-sm ${
                          validationErrors.name
                            ? 'border-red-600 focus:border-red-500 focus:ring-red-600'
                            : 'border-gray-700 focus:border-gray-500 focus:ring-gray-600'
                        }`}
                        placeholder="John Doe"
                      />
                      {validationErrors.name && (
                        <p className="text-xs text-red-400 mt-1">{validationErrors.name}</p>
                      )}
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                    >
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Email {validationErrors.email && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 bg-black/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors text-sm ${
                          validationErrors.email
                            ? 'border-red-600 focus:border-red-500 focus:ring-red-600'
                            : 'border-gray-700 focus:border-gray-500 focus:ring-gray-600'
                        }`}
                        placeholder="john@example.com"
                      />
                      {validationErrors.email && (
                        <p className="text-xs text-red-400 mt-1">{validationErrors.email}</p>
                      )}
                    </motion.div>
                  </div>

                  {/* Company */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-600 transition-colors text-sm"
                      placeholder="Your company"
                    />
                  </motion.div>

                  {/* Preferred Meeting Date */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.515 }}
                  >
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Preferred Meeting Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={getTodayDate()}
                      className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-600 transition-colors text-sm"
                    />
                  </motion.div>

                  {/* Preferred Meeting Time */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.525 }}
                  >
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Preferred Meeting Time (optional)
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-600 transition-colors text-sm"
                    >
                      <option value="">Select a time slot...</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                  >
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      What are you looking to automate? (optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-600 transition-colors resize-none text-sm"
                      placeholder="Tell us about your challenges..."
                    />
                  </motion.div>

                  {/* Buttons Container */}
                  <div className="space-y-2 pt-2">
                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-white text-black font-bold text-sm sm:text-base hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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

                  {/* Note */}
                  <p className="text-xs text-gray-500 text-center">
                    No credit card required • We respect your privacy
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
