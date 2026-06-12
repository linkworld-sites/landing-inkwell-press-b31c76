import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Journal — Pressed & Co.',
  description: 'Studio notes, process writing, and seasonal dispatches from the letterpress atelier.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bone pt-28 pb-0">
        {/* Header */}
        <div className="px-6 md:px-12 mb-16 border-b border-laid-paper pb-12">
          <span className="micro-label text-quartz-taupe block mb-4">Studio Journal</span>
          <h1 className="font-display italic font-light text-press-black text-5xl md:text-7xl leading-none">
            Press notes
          </h1>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="px-6 md:px-12 py-20 text-center">
            <p className="font-display italic font-light text-quartz-taupe text-2xl">
              The first pull is coming.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-laid-paper">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="px-6 md:px-12 py-10 md:py-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 hover:bg-laid-paper/30 transition-colors">
                  <div>
                    <time className="micro-label text-quartz-taupe">{post.date}</time>
                  </div>
                  <div>
                    <h2 className="font-display italic font-light text-press-black text-2xl md:text-3xl mb-3 group-hover:text-letterpress-red transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-quartz-taupe leading-relaxed max-w-xl">
                      {post.description}
                    </p>
                    <span className="micro-label text-press-black border-b border-press-black/20 pb-px mt-5 inline-block group-hover:border-letterpress-red group-hover:text-letterpress-red transition-colors">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
