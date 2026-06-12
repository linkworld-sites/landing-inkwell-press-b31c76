'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const featured = [
  {
    image: '/images/detail.png',
    collection: 'Ivory & Slate Wedding Suite',
    editorial:
      'Printed on 600gsm Crane Lettra, blind-debossed with a custom monogram. The envelope liners are hand-cut from Japanese tissue. Every element of this suite was considered in the context of the evening it would announce — a winter ceremony in a stone chapel, a couple who believe that beauty lives in the particular.',
    tag: 'Wedding Suite',
    cta: 'View the suite',
    imageLeft: true,
  },
  {
    image: '/images/material.png',
    collection: 'The Correspondence Series',
    editorial:
      'A set of twelve correspondence cards in rotating seasonal colorways. Each card is set in 12pt Caslon italic and printed in a single colour: a different Pantone each quarter. Subscribe and receive four cards, four envelopes, and a linen-covered box that opens like a book.',
    tag: 'Cards',
    cta: 'Join the series',
    imageLeft: false,
  },
]

function GhostCTA({ label }: { label: string }) {
  return (
    <motion.button
      className="relative group inline-flex items-center gap-3 border border-press-black px-8 py-4 font-body text-sm text-press-black mt-8 overflow-hidden"
      whileHover={{ scale: 1.01, borderColor: '#C4503A' }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        className="absolute inset-0 bg-press-black"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      />
      <span className="relative z-10 group-hover:text-bone transition-colors duration-300">{label}</span>
      <span className="relative z-10 micro-label group-hover:text-bone transition-colors duration-300">→</span>
    </motion.button>
  )
}

function FeaturedItem({ item, index }: { item: typeof featured[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[80vh] ${index > 0 ? 'border-t border-laid-paper' : ''}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Image */}
      <motion.div
        className={`relative min-h-[50vh] md:min-h-full overflow-hidden ${item.imageLeft ? 'md:order-first' : 'md:order-last'}`}
        initial={{ opacity: 0, x: item.imageLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={item.image}
          alt={item.collection}
          fill
          className="object-cover object-center"
          sizes="50vw"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className={`flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 bg-bone ${item.imageLeft ? 'md:order-last' : 'md:order-first'}`}
        initial={{ opacity: 0, x: item.imageLeft ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="micro-label text-letterpress-red mb-6">{item.tag}</span>
        <h3 className="font-display italic font-light text-press-black text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
          {item.collection}
        </h3>
        <p className="font-body text-sm text-quartz-taupe leading-relaxed max-w-md">
          {item.editorial}
        </p>
        <GhostCTA label={item.cta} />
      </motion.div>
    </motion.div>
  )
}

export default function FeaturedCollection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="border-t border-laid-paper">
      <div className="px-6 md:px-12 py-16 flex items-end justify-between border-b border-laid-paper">
        <motion.h2
          ref={ref}
          className="font-display italic font-light text-press-black text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Featured collections
        </motion.h2>
        <span className="micro-label text-quartz-taupe hidden md:block">The kind of stationery people keep.</span>
      </div>

      {featured.map((item, i) => (
        <FeaturedItem key={item.collection} item={item} index={i} />
      ))}
    </section>
  )
}
