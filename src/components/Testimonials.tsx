'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const testimonials = [
  {
    quote: 'We received our invitations eight weeks before the wedding and they sat on the kitchen table for three days. People just kept picking them up.',
    name: 'Caroline H.',
    detail: 'Wedding, October 2025',
  },
  {
    quote: 'The impression on the cotton paper is unlike anything I have touched. Our guests commented on it more than almost anything else from the day.',
    name: 'Tom & Ellie S.',
    detail: 'Bespoke suite, 2025',
  },
  {
    quote: 'Not printed. Pressed. The difference is in your fingers before it is in your eyes. Worth every penny.',
    name: 'Diana M.',
    detail: 'Correspondence cards',
  },
  {
    quote: 'We ordered a custom art print for our first home. Six months later it is still the thing everyone asks about when they visit.',
    name: 'James P.',
    detail: 'Art print commission',
  },
  {
    quote: 'The studio communicated clearly at every step. They showed us proofs on the actual paper stock before committing. Real craft, real care.',
    name: 'Francesca L.',
    detail: 'Wedding suite, 2024',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <section ref={sectionRef} className="border-t border-laid-paper py-20 md:py-28 overflow-hidden">
      <div className="px-6 md:px-12 mb-12">
        <motion.div
          ref={headerRef}
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display italic font-light text-press-black text-4xl md:text-5xl">
            What people say
          </h2>
          <span className="micro-label text-quartz-taupe hidden md:block">Typeset testimonials</span>
        </motion.div>
      </div>

      {/* Horizontal drift strip */}
      <motion.div
        className="flex gap-4 md:gap-6 px-6 md:px-12"
        style={{ x }}
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={t.name}
            className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[38vw] lg:w-[28vw] bg-laid-paper p-8 md:p-10 shadow-[0_2px_20px_rgba(28,20,16,0.06)]"
            initial={{ opacity: 0, y: 30, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Decorative registration mark */}
            <div className="flex justify-end mb-6">
              <span className="text-quartz-taupe/30 text-xs font-body">✦</span>
            </div>

            <p className="font-display italic font-light text-press-black text-base md:text-lg leading-relaxed mb-8">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="border-t border-press-black/10 pt-5">
              <p className="font-display italic text-press-black text-sm">{t.name}</p>
              <p className="micro-label text-quartz-taupe mt-1">{t.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
