'use client'

import { motion, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: 90,
    suffix: '%',
    label: 'Cost Reduction',
    sublabel: 'Monthly savings',
  },
  {
    value: 50,
    suffix: 'K+',
    label: 'Leads Generated',
    sublabel: 'Last year',
  },
  {
    value: 99.8,
    suffix: '%',
    label: 'Uptime',
    sublabel: 'Guaranteed',
  },
  {
    value: 40,
    suffix: 'hrs',
    label: 'Saved/Week',
    sublabel: 'Per client',
  },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const controls = animate(0, value, {
            duration: 2,
            ease: 'easeOut',
            onUpdate: (latest) => {
              setDisplayValue(latest)
            },
          })
          return () => controls.stop()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  const formattedValue = value % 1 !== 0 
    ? displayValue.toFixed(1) 
    : Math.round(displayValue).toString()

  return (
    <span ref={ref}>
      {formattedValue}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="results" className="py-24 px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Number */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-white font-medium text-base mb-1">
                {stat.label}
              </p>

              {/* Sublabel */}
              <p className="text-[#888888] text-sm">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
