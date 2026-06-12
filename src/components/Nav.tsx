'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const links = [
  { href: '#products', label: 'Products' },
  { href: '#process', label: 'Process' },
  { href: '#wedding', label: 'Weddings' },
  { href: '/blog', label: 'Journal' },
]

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(245,240,232,0)', 'rgba(245,240,232,0.96)'])
  const borderOp = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <motion.nav
      style={{ backgroundColor: bg }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-sm"
    >
      <motion.div style={{ opacity: borderOp }} className="absolute inset-x-0 bottom-0 h-px bg-laid-paper" />

      <Link href="/" className="font-display text-lg italic font-light tracking-wide text-press-black">
        Pressed & Co.
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <motion.div key={link.href} whileHover={{ opacity: 0.6 }} transition={{ duration: 0.2 }}>
            <Link
              href={link.href}
              className="micro-label text-press-black hover:text-letterpress-red transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="#footer"
        className="micro-label border border-press-black px-4 py-2 relative overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <span className="relative z-10">Contact</span>
        <motion.span
          className="absolute inset-0 bg-press-black"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="absolute inset-0 z-10 flex items-center justify-center micro-label text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Contact
        </span>
      </motion.a>
    </motion.nav>
  )
}
