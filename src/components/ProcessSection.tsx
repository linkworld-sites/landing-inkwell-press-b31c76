'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    number: '01',
    title: 'Typeset',
    description:
      'Each character is chosen from a California job case and set by hand in a composing stick. The type is locked into a chase and proofed on newsprint before we ever touch cotton paper.',
  },
  {
    number: '02',
    title: 'Lock-up',
    description:
      'The composed form is locked into the press bed with furniture and quoins, planed flat, then inked with a hand roller. Every lock-up is a small act of geometry.',
  },
  {
    number: '03',
    title: 'Pull',
    description:
      'The press cylinder rolls across the form. Cotton paper meets metal type under carefully calibrated impression. The deboss — that shallow valley in the sheet — is what makes letterpress unmistakable.',
  },
  {
    number: '04',
    title: 'Trim',
    description:
      'Sheets are scored and trimmed to final size on a guillotine. Edges are left deckled or cut clean depending on the suite. Each piece is examined individually before it leaves the studio.',
  },
]

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(steps.length - 1) * 100}%`]
  )

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(steps.length - 1, Math.round(latest * steps.length))
    setActiveStep(step)
  })

  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-10%' })

  return (
    <section id="process" ref={containerRef} style={{ height: `${steps.length * 100}vh` }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-bone">
        {/* Section label */}
        <div className="absolute top-8 left-6 md:left-12 z-10">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="micro-label text-quartz-taupe">The Process</span>
          </motion.div>
        </div>

        {/* Horizontal slider */}
        <motion.div className="flex h-full" style={{ x }}>
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex-shrink-0 w-screen h-full grid grid-cols-1 md:grid-cols-2 gap-0"
            >
              {/* Image half */}
              <div className="relative h-1/2 md:h-full overflow-hidden bg-laid-paper">
                <Image
                  src="/images/process.png"
                  alt={`Step ${step.number}: ${step.title}`}
                  fill
                  className="object-cover object-center grayscale"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-press-black/10" />
              </div>

              {/* Text half */}
              <div className="flex flex-col justify-center px-10 md:px-16 py-12">
                <div className="mb-6">
                  <motion.span
                    className="font-display font-light text-6xl md:text-8xl"
                    animate={
                      activeStep === index
                        ? { color: '#C4503A', scale: [1, 1.1, 1] }
                        : { color: '#D4C9B5', scale: 1 }
                    }
                    transition={
                      activeStep === index
                        ? { duration: 0.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }
                        : { duration: 0.4 }
                    }
                  >
                    {step.number}
                  </motion.span>
                </div>

                <motion.h3
                  className="font-display italic font-light text-press-black text-4xl md:text-5xl mb-6"
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                >
                  {step.title}
                </motion.h3>

                <p className="font-body text-sm md:text-base text-quartz-taupe leading-relaxed max-w-md">
                  {step.description}
                </p>

                {/* Step progress dots */}
                <div className="mt-10 flex items-center gap-3">
                  {steps.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-px"
                      animate={{
                        width: i === index ? 32 : 12,
                        backgroundColor: i === index ? '#C4503A' : '#D4C9B5',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
