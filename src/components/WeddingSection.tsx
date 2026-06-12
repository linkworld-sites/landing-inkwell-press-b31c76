'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const couples = [
  { image: '/images/detail.png', names: 'E & J', year: '2025' },
  { image: '/images/material.png', names: 'A & M', year: '2025' },
  { image: '/images/process.png', names: 'S & R', year: '2024' },
]

function BriefForm({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-forest-ink flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-full max-w-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={onClose}
          className="micro-label text-bone/50 hover:text-bone mb-10 flex items-center gap-2 transition-colors"
        >
          ← Close
        </button>

        <span className="micro-label text-letterpress-red block mb-4">Begin Your Suite</span>
        <h2 className="font-display italic font-light text-bone text-4xl md:text-5xl mb-3">
          Tell us about your day.
        </h2>
        <p className="font-body text-sm text-bone/60 mb-12 leading-relaxed">
          Every bespoke suite begins with a conversation. Share a few details and we will follow up within two working days.
        </p>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {[
            { label: 'Your names', placeholder: 'Emma & James' },
            { label: 'Wedding date', placeholder: 'October 2026' },
            { label: 'Estimated guest count', placeholder: '120' },
            { label: 'Email address', placeholder: 'you@domain.com' },
          ].map((field) => (
            <div key={field.label} className="flex flex-col gap-2">
              <label className="micro-label text-bone/50">{field.label}</label>
              <input
                type="text"
                placeholder={field.placeholder}
                className="bg-transparent border-b border-bone/20 focus:border-bone/60 outline-none text-bone font-body text-base py-2 placeholder:text-bone/20 transition-colors"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="micro-label text-bone/50">Tell us about your aesthetic</label>
            <textarea
              rows={3}
              placeholder="Minimal, serif-led. Winter. Stone chapel."
              className="bg-transparent border-b border-bone/20 focus:border-bone/60 outline-none text-bone font-body text-base py-2 placeholder:text-bone/20 resize-none transition-colors"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full border border-bone/40 hover:border-bone text-bone micro-label py-4 mt-4 transition-colors"
            whileHover={{ backgroundColor: 'rgba(245,240,232,0.06)' }}
            whileTap={{ scale: 0.99 }}
          >
            Send brief →
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function WeddingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <AnimatePresence>{formOpen && <BriefForm onClose={() => setFormOpen(false)} />}</AnimatePresence>

      <section id="wedding" ref={ref} className="bg-forest-ink py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="micro-label text-laid-paper/60 block mb-6">Bespoke Service</span>
            <h2 className="font-display italic font-light text-bone text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Bespoke wedding suites.{' '}
              <em className="not-italic text-laid-paper/70">Set by hand.</em>
            </h2>
            <p className="font-body text-sm md:text-base text-bone/60 leading-relaxed">
              Your invitation should arrive like a gift. We work with a small number of couples each year — enough to give each suite the attention it deserves. The process begins three to four months before your date. We handle the typography, the paper selection, the colour mixing, the printing, and the finishing. You handle the guest list.
            </p>
            <p className="font-body text-sm md:text-base text-bone/60 leading-relaxed mt-4">
              Pulled one sheet at a time, on cotton paper your guests will keep long after the day itself.
            </p>
          </motion.div>
        </div>

        {/* Couple image strip */}
        <motion.div
          className="flex gap-px overflow-hidden mx-0"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {couples.map((c, i) => (
            <div key={c.names} className="relative flex-1 aspect-[3/4] overflow-hidden">
              <Image
                src={c.image}
                alt={`Wedding suite for ${c.names}`}
                fill
                className="object-cover object-center"
                sizes="33vw"
              />
              {/* Soft vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-display italic text-bone/90 text-lg">{c.names}</p>
                <span className="micro-label text-bone/40">{c.year}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.button
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-3 font-display italic font-light text-bone text-lg md:text-xl border-b border-bone/30 hover:border-bone pb-1 transition-colors"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.25 }}
          >
            Begin Your Suite →
          </motion.button>
        </motion.div>
      </section>
    </>
  )
}
