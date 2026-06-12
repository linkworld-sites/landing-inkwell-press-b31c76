'use client'

import { motion } from 'framer-motion'

const text = 'HAND-SET · HAND-INKED · MADE TO ORDER · COTTON PAPER · SLOW CRAFT · '

export default function EthosStrip() {
  const repeated = text.repeat(4)

  return (
    <div className="relative overflow-hidden bg-press-black py-4 border-y border-press-black">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 22,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {[repeated, repeated].map((t, i) => (
          <span
            key={i}
            className="micro-label text-bone text-[13px] tracking-[0.18em] flex-shrink-0 px-2"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
