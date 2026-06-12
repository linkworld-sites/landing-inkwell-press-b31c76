import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  content: string
}

export function getAllPosts(): Post[] {
  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(postsDirectory)
  } catch {
    return []
  }

  const posts = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => {
      const slug = fn.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      const fullPath = path.join(postsDirectory, fn)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const rawDate = data.date
      const date = rawDate instanceof Date
        ? rawDate.toISOString().slice(0, 10)
        : String(rawDate ?? '')
      return {
        slug,
        title: (data.title as string) ?? slug,
        date,
        description: (data.description as string) ?? '',
        content,
      }
    })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(postsDirectory)
  } catch {
    return null
  }

  const fileName = fileNames.find((fn) => fn.includes(slug) && fn.endsWith('.md'))
  if (!fileName) return null

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)

  const rawDate = data.date
  const date = rawDate instanceof Date
    ? rawDate.toISOString().slice(0, 10)
    : String(rawDate ?? '')

  return {
    slug,
    title: (data.title as string) ?? slug,
    date,
    description: (data.description as string) ?? '',
    content: processedContent.toString(),
  }
}
