import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Pressed & Co.`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bone pt-28 pb-0">
        {/* Back link */}
        <div className="px-6 md:px-12 mb-8">
          <Link href="/blog" className="micro-label text-quartz-taupe hover:text-press-black transition-colors">
            ← Journal
          </Link>
        </div>

        {/* Post header */}
        <header className="px-6 md:px-12 mb-16 border-b border-laid-paper pb-12 max-w-3xl">
          <time className="micro-label text-quartz-taupe block mb-4">{post.date}</time>
          <h1 className="font-display italic font-light text-press-black text-4xl md:text-6xl leading-tight mb-6">
            {post.title}
          </h1>
          <p className="font-body text-base text-quartz-taupe leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Post body */}
        <article
          className="px-6 md:px-12 pb-24 max-w-2xl prose-pressedco"
          style={{ '--tw-prose-body': '#8C7B6B' } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
      <Footer />
    </>
  )
}
