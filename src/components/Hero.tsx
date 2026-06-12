'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const letters = 'Pressed & Co.'.split('')

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Background photograph */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/images/hero.png"
          alt="Letterpress sheet on a Vandercook press bed"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-press-black/20" />
      </motion.div>

      {/* Ghost headline — the hero moment */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start pl-[4vw] md:pl-[6vw]"
        style={{ opacity, y }}
      >
        <motion.h1
          className="font-display font-light italic text-bone leading-none select-none"
          style={{ fontSize: 'clamp(4rem, 18vw, 22rem)', opacity: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6 + i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>

      {/* Bottom caption */}
      <motion.div
        className="absolute bottom-10 left-6 md:left-12 right-6"
        style={{ opacity, y }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="micro-label text-bone/70 mb-2">Est. in a workshop on a cobbled street</p>
        <p className="font-display italic font-light text-bone text-xl md:text-2xl">
          Every card begins with a block of lead and ends in someone&apos;s hands.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="micro-label text-bone/50">Scroll</span>
        <motion.div
          className="w-px h-12 bg-bone/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
