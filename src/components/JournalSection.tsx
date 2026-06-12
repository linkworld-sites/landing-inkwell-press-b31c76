'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const posts = [
  {
    title: 'On the weight of paper',
    pullQuote: 'A sheet of cotton Lettra has a particular resistance when you hold it to the light. This is the resistance that makes letterpress worth doing.',
    image: '/images/material.png',
    date: 'June 2026',
    tag: 'Studio notes',
    href: '/blog',
    height: 'md:h-[520px]',
  },
  {
    title: 'Why every colour is mixed by hand',
    pullQuote: 'PMS 187 out of the tin reads one way. Mixed with an extender and pulled through the form it reads another. That gap is where craft lives.',
    image: '/images/detail.png',
    date: 'May 2026',
    tag: 'Colour',
    href: '/blog',
    height: 'md:h-[420px]',
  },
  {
    title: 'The first pull of the year',
    pullQuote: 'January is for setting new type. Cold mornings, slow ink, and the particular silence of a studio that has been resting.',
    image: '/images/process.png',
    date: 'January 2026',
    tag: 'Seasonal',
    href: '/blog',
    height: 'md:h-[560px]',
  },
]

function JournalCard({ post, index }: { post: typeof posts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-laid-paper group cursor-pointer ${post.height} flex flex-col`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={post.href} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden flex-shrink-0">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
              sizes="33vw"
            />
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="micro-label text-letterpress-red">{post.tag}</span>
            <span className="micro-label text-quartz-taupe">{post.date}</span>
          </div>
          <h3 className="font-display font-light text-press-black text-xl md:text-2xl mb-4 leading-snug">
            {post.title}
          </h3>
          <p className="font-display italic font-light text-quartz-taupe text-sm md:text-base leading-relaxed flex-1">
            &ldquo;{post.pullQuote}&rdquo;
          </p>
          <motion.span
            className="micro-label text-press-black border-b border-press-black/30 pb-px w-fit mt-6 group-hover:border-press-black transition-colors"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            Read →
          </motion.span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function JournalSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="border-t border-laid-paper py-20 md:py-28 px-6 md:px-12">
      <div className="flex items-end justify-between mb-12">
        <motion.h2
          ref={ref}
          className="font-display italic font-light text-press-black text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Press notes
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link href="/blog" className="micro-label text-quartz-taupe hover:text-press-black transition-colors border-b border-quartz-taupe/30 pb-px">
            All posts →
          </Link>
        </motion.div>
      </div>

      {/* Ragged grid — different heights, no uniform gutters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-start">
        {posts.map((post, i) => (
          <JournalCard key={post.title} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}
