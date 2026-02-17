'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Calendar, Smartphone, CheckCircle2, Bell } from 'lucide-react'

/**
 * EmailScanningAnimation
 * Envelope opens → text lines appear with scanning effect → checkmarks appear
 * Duration: 3-4 seconds, loops
 */
function EmailScanningAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const envelopeVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  const containerLoop = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-start space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
      key="email-animation"
    >
      {/* Envelope with flap animation */}
      <motion.div
        className="perspective"
        variants={envelopeVariants}
      >
        <motion.div
          className="relative w-16 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg flex items-center justify-center overflow-hidden"
          initial={{ rotateX: 0 }}
          whileInView={{ rotateX: -25 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Mail className="w-8 h-8 text-gray-700" />
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gray-500 transform-gpu"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Email content with text lines and checkmarks */}
      <motion.div
        className="space-y-2 ml-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={containerLoop}
      >
        {[
          { text: 'New lead: John Smith', delay: 0.6 },
          { text: 'Interested in: Lead Gen', delay: 0.9 },
          { text: 'Email: john@company.com', delay: 1.2 },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-2"
          >
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex-grow"
              initial={{ width: 0 }}
              whileInView={{ width: '160px' }}
              viewport={{ once: false }}
              transition={{
                delay: item.delay,
                duration: 0.4,
              }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{
                delay: item.delay + 0.3,
                duration: 0.4,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Email subject text */}
      <motion.p
        className="text-sm text-gray-300 ml-2 mt-2"
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        Lead ready for follow-up
      </motion.p>
    </motion.div>
  )
}

/**
 * CalendarBookingAnimation
 * Calendar appears → event block slides in → text appears → checkmark appears
 * Duration: 3-4 seconds, loops
 */
function CalendarBookingAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const eventBlockVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.5,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.4,
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-start space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
      key="calendar-animation"
    >
      {/* Calendar icon */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 150,
        }}
      >
        <Calendar className="w-12 h-12 text-blue-400" />
      </motion.div>

      {/* Event block */}
      <motion.div
        className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 rounded-lg p-3"
        variants={eventBlockVariants}
      >
        <motion.div
          className="flex items-center justify-between"
          variants={textVariants}
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-blue-300">
              Client Consultation
            </span>
            <span className="text-xs text-gray-400">2:00 PM - 3:00 PM</span>
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{
              delay: 1.3,
              duration: 0.4,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Status text */}
      <motion.p
        className="text-sm text-gray-300 ml-2"
        variants={textVariants}
      >
        Meeting confirmed & scheduled
      </motion.p>
    </motion.div>
  )
}

/**
 * PhoneNotificationAnimation
 * Phone appears → notification badge pops → message appears → vibration shake
 * Duration: 3-4 seconds, loops
 */
function PhoneNotificationAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const notificationVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.9,
        duration: 0.4,
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
      key="phone-animation"
    >
      {/* Phone with vibration effect */}
      <motion.div
        className="relative"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-14 h-24 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl border-2 border-gray-400 flex items-center justify-center overflow-hidden shadow-lg"
          animate={{
            x: [0, 0, -3, 3, -3, 3, 0],
          }}
          transition={{
            delay: 1.4,
            duration: 0.4,
          }}
        >
          <div className="w-12 h-22 bg-gray-900 rounded-xl flex items-center justify-center relative">
            <Smartphone className="w-6 h-6 text-gray-600" />
          </div>
        </motion.div>

        {/* Notification badge */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            delay: 0.5,
            duration: 0.4,
            type: 'spring',
            stiffness: 200,
          }}
        >
          1
        </motion.div>
      </motion.div>

      {/* Notification message */}
      <motion.div
        className="w-full max-w-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/40 rounded-lg p-3"
        variants={notificationVariants}
      >
        <div className="flex items-start gap-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 1.0, duration: 0.3, type: 'spring', stiffness: 200 }}
            className="flex-shrink-0"
          >
            <Bell className="w-5 h-5 text-green-400 mt-0.5" />
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-300">Report Ready</p>
            <p className="text-xs text-gray-300 mt-1">
              📊 Your automated report is ready for review
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status text */}
      <motion.p
        className="text-sm text-gray-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 1.8, duration: 0.4 }}
      >
        Instant notifications
      </motion.p>
    </motion.div>
  )
}

/**
 * AnimatedSequences
 * Main component that displays all 3 animations
 * Can rotate through them or display side-by-side
 */
interface AnimatedSequencesProps {
  variant?: 'carousel' | 'grid' | 'stacked'
  autoRotate?: boolean
  rotationInterval?: number
}

export default function AnimatedSequences({
  variant = 'grid',
  autoRotate = true,
  rotationInterval = 6000,
}: AnimatedSequencesProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate if carousel mode
  useEffect(() => {
    if (variant !== 'carousel' || !autoRotate) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [variant, autoRotate, rotationInterval])

  const animations = [
    {
      id: 'email',
      title: 'Lead Detection',
      component: <EmailScanningAnimation />,
    },
    {
      id: 'calendar',
      title: 'Meeting Automation',
      component: <CalendarBookingAnimation />,
    },
    {
      id: 'phone',
      title: 'Smart Notifications',
      component: <PhoneNotificationAnimation />,
    },
  ]

  if (variant === 'carousel') {
    return (
      <div className="w-full max-w-2xl mx-auto">
        {/* Carousel container */}
        <motion.div
          className="relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/50 p-12 min-h-[400px] flex items-center justify-center"
          key={`carousel-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-8">
            {animations[activeIndex].component}
            <motion.h3
              className="text-lg font-semibold text-white text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {animations[activeIndex].title}
            </motion.h3>
          </div>
        </motion.div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {animations.map((_, idx) => (
            <motion.button
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === activeIndex
                  ? 'bg-blue-400 w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setActiveIndex(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <motion.div className="w-full max-w-2xl mx-auto space-y-6">
        {animations.map((animation, idx) => (
          <motion.div
            key={animation.id}
            className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              {animation.title}
            </h3>
            <div className="flex justify-center">{animation.component}</div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Grid variant (default)
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      {animations.map((animation, idx) => (
        <motion.div
          key={animation.id}
          className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/50 p-8 flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: idx * 0.15, duration: 0.5 }}
          whileHover={{
            borderColor: 'rgb(96, 165, 250)',
            transition: { duration: 0.2 },
          }}
        >
          <h3 className="text-base font-semibold text-white text-center">
            {animation.title}
          </h3>
          <div className="flex justify-center flex-grow pt-4">
            {animation.component}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Export individual animations for standalone use
export { EmailScanningAnimation, CalendarBookingAnimation, PhoneNotificationAnimation }
