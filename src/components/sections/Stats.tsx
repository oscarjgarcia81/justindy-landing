'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const stats = [
  {
    id: 1,
    number: 90,
    suffix: '%',
    label: 'Cost Reduction',
    subheadline: 'Monthly savings',
  },
  {
    id: 2,
    number: 50000,
    suffix: '+',
    label: 'Leads Generated',
    subheadline: 'Last year',
  },
  {
    id: 3,
    number: 99.8,
    suffix: '%',
    label: 'Uptime',
    isDecimal: true,
    subheadline: 'Guaranteed',
  },
  {
    id: 4,
    number: 40,
    suffix: 'hrs',
    label: 'Saved/Week',
    subheadline: 'Per client',
  },
]

interface CounterProps {
  targetNumber: number
  suffix: string
  isDecimal?: boolean
  delay: number
}

function Counter({ targetNumber, suffix, isDecimal, delay }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return

    const timer = setTimeout(() => {
      let start = 0
      const increment = targetNumber / 50
      const interval = setInterval(() => {
        start += increment
        if (start >= targetNumber) {
          setCount(targetNumber)
          clearInterval(interval)
        } else {
          setCount(Math.floor(start))
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [targetNumber, delay, inView])

  return <span ref={ref}>{isDecimal ? count.toFixed(1) : count}{suffix}</span>
}

interface StatCardProps {
  stat: (typeof stats)[0]
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  return (
    <motion.div
      className="text-center space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.05, opacity: 0.8 }}
    >
      {/* Number */}
      <motion.div
        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <Counter
          targetNumber={stat.number}
          suffix={stat.suffix}
          isDecimal={stat.isDecimal}
          delay={index * 0.2}
        />
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-sm sm:text-base text-gray-400 font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {stat.label}
      </motion.p>

      {/* Subheadline */}
      {stat.subheadline && (
        <motion.p
          className="text-xs sm:text-sm text-gray-500 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {stat.subheadline}
        </motion.p>
      )}
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section id="results" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 lg:gap-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
