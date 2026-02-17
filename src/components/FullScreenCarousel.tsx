'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Calendar, Smartphone, CheckCircle2, Bell } from 'lucide-react'

/**
 * EmailScanningAnimation - Compact version for full-screen background
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
      className="flex flex-col items-center justify-center space-y-4 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Envelope with flap animation */}
      <motion.div
        className="perspective"
        variants={envelopeVariants}
      >
        <motion.div
          className="relative w-24 h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg flex items-center justify-center overflow-hidden"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -25 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Mail className="w-12 h-12 text-gray-700" />
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gray-500 transform-gpu"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Email content with text lines and checkmarks */}
      <motion.div
        className="space-y-3 flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerLoop}
      >
        {[
          { text: 'New lead: John Smith', delay: 0.6 },
          { text: 'Interested in: Lead Gen', delay: 0.9 },
          { text: 'Email: john@company.com', delay: 1.2 },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-3"
          >
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{
                delay: item.delay,
                duration: 0.5,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: item.delay + 0.5,
                duration: 0.3,
              }}
            >
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

/**
 * CalendarBookingAnimation - Compact version for full-screen background
 */
function CalendarBookingAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Calendar icon */}
      <motion.div
        className="w-24 h-20 bg-gradient-to-b from-purple-300 to-purple-400 rounded-lg flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Calendar className="w-12 h-12 text-purple-700" />
      </motion.div>

      {/* Event block */}
      <motion.div
        className="w-60 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg p-4 text-white text-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="text-sm font-semibold">2:00 PM - Client Consultation</p>
        <p className="text-xs text-purple-100 mt-1">Meeting Scheduled</p>
      </motion.div>

      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </motion.div>
    </motion.div>
  )
}

/**
 * PhoneNotificationAnimation - Compact version for full-screen background
 */
function PhoneNotificationAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Phone */}
      <motion.div
        className="w-20 h-32 bg-gradient-to-b from-gray-300 to-gray-400 rounded-3xl border-4 border-gray-500 flex items-center justify-center relative overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Smartphone className="w-10 h-10 text-gray-700" />

        {/* Notification badge */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Bell className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Notification message */}
      <motion.div
        className="bg-gray-800 text-white px-6 py-3 rounded-lg text-center max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <p className="text-sm font-medium">📊 Your report is ready!</p>
        <p className="text-xs text-gray-400 mt-1">Check it now</p>
      </motion.div>

      {/* Vibration effect */}
      <motion.div
        className="w-20 h-32 absolute opacity-0"
        animate={{ x: [0, -3, 3, -3, 0] }}
        transition={{ delay: 0.7, duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] }}
      />
    </motion.div>
  )
}

/**
 * FullScreenCarousel - Animations without UI chrome, fills entire screen
 */
interface FullScreenCarouselProps {
  autoRotate?: boolean
  rotationInterval?: number
}

export default function FullScreenCarousel({
  autoRotate = true,
  rotationInterval = 4000,
}: FullScreenCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotate, rotationInterval])

  const animations = [
    <EmailScanningAnimation key="email" />,
    <CalendarBookingAnimation key="calendar" />,
    <PhoneNotificationAnimation key="phone" />,
  ]

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      key={`carousel-${activeIndex}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {animations[activeIndex]}
    </motion.div>
  )
}
