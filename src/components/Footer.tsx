'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <footer id="footer" className="border-t border-laid-paper bg-bone">
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-0"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left — studio info */}
        <div className="px-8 md:px-12 py-12 md:py-16 border-b md:border-b-0 md:border-r border-laid-paper">
          <div className="mb-8">
            <p className="font-display italic font-light text-press-black text-2xl mb-1">Pressed & Co.</p>
            <span className="micro-label text-quartz-taupe">Artisan Letterpress Studio</span>
          </div>

          <table className="w-full text-left border-collapse">
            <tbody>
              {[
                ['Address', '14 Inkwell Lane, London EC1V 2BT'],
                ['Studio hours', 'Mon–Fri 09:00–17:00'],
                ['Telephone', '+44 20 7946 0958'],
                ['Instagram', '@pressedandco'],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-laid-paper last:border-0">
                  <td className="micro-label text-quartz-taupe py-3 pr-6 w-32">{label}</td>
                  <td className="font-body text-sm text-press-black py-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-6 mt-10">
            {[
              { label: 'Products', href: '#products' },
              { label: 'Process', href: '#process' },
              { label: 'Weddings', href: '#wedding' },
              { label: 'Journal', href: '/blog' },
            ].map((link) => (
              <motion.div key={link.label} whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
                <Link href={link.href} className="micro-label text-press-black hover:text-letterpress-red transition-colors">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — newsletter */}
        <div className="px-8 md:px-12 py-12 md:py-16 relative">
          <span className="micro-label text-quartz-taupe block mb-4">Newsletter</span>
          <h3 className="font-display italic font-light text-press-black text-2xl md:text-3xl mb-2">
            Get the First Pull.
          </h3>
          <p className="font-body text-sm text-quartz-taupe leading-relaxed mb-10 max-w-sm">
            Studio notes, seasonal announcements, and the occasional glimpse of a proof in progress. No noise. Never more than twice a month.
          </p>

          <form
            className="flex flex-col gap-0 max-w-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <input
                type="email"
                placeholder="your@address.com"
                className="w-full bg-transparent border-b border-press-black/30 focus:border-press-black outline-none font-body text-sm text-press-black py-3 placeholder:text-press-black/30 transition-colors"
              />
            </div>
            <motion.button
              type="submit"
              className="micro-label text-press-black border border-press-black px-6 py-3 mt-4 w-fit hover:bg-press-black hover:text-bone transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Subscribe →
            </motion.button>
          </form>

          {/* Registration cross — decorative print markup motif */}
          <div
            className="absolute bottom-8 right-8 text-quartz-taupe/30 select-none pointer-events-none"
            aria-hidden="true"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.75" />
              <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="0.75" />
              <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-laid-paper px-8 md:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="micro-label text-quartz-taupe">© 2026 Pressed & Co. All rights reserved.</span>
        <span className="micro-label text-quartz-taupe">Not printed. Pressed.</span>
      </div>
    </footer>
  )
}
