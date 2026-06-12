'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const categories = [
  {
    name: 'Cards',
    description: 'Correspondence that arrives with weight.',
    image: '/images/material.png',
    folio: '01',
  },
  {
    name: 'Invitations',
    description: 'Bespoke suites, set by hand and pulled one sheet at a time.',
    image: '/images/detail.png',
    folio: '02',
  },
  {
    name: 'Art Prints',
    description: 'Limited edition prints. Ink in paper grain.',
    image: '/images/hero.png',
    folio: '03',
  },
]

function CategoryPanel({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      className="relative flex-1 min-h-[70vh] md:min-h-screen overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Photograph */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover object-center"
          sizes="33vw"
        />
      </motion.div>

      {/* Always-visible folio number */}
      <div className="absolute top-6 left-6 z-10">
        <span className="micro-label text-bone/60">{cat.folio}</span>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-press-black flex flex-col justify-end p-8 md:p-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.88 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <p className="micro-label text-letterpress-red mb-3">{cat.folio} / Browse</p>
          <h3 className="font-display italic font-light text-bone text-5xl md:text-6xl mb-3">
            {cat.name}
          </h3>
          <p className="font-body text-sm text-bone/70 max-w-xs leading-relaxed">
            {cat.description}
          </p>
          <motion.span
            className="inline-flex items-center gap-2 mt-6 micro-label text-bone border-b border-bone/40 pb-px"
            style={{ translateX: 0 }}
            whileHover={{ x: 4 }}
          >
            Browse collection →
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Diagonal slide-in accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-bone/20"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

export default function ProductGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="products" className="relative">
      <div className="px-6 md:px-12 pt-20 pb-10">
        <motion.div
          ref={ref}
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display italic font-light text-press-black text-4xl md:text-5xl">
            The work
          </h2>
          <span className="micro-label text-quartz-taupe">Three disciplines</span>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row">
        {categories.map((cat, i) => (
          <CategoryPanel key={cat.name} cat={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
