import fg from 'fast-glob'
import matter from 'gray-matter'
import { readFile } from 'node:fs/promises'

export interface PostFrontMatter {
  date: string
  title?: string
  tags?: string[]
  description?: string
}

export interface Post {
  frontMatter: PostFrontMatter
  regularPath: string
}

async function getPostMDFilePaths(): Promise<string[]> {
  return fg(['posts/**/*.md'], {
    ignore: ['node_modules', 'README.md'],
  })
}

function formatDate(date: string | Date = new Date().toString()): string {
  return new Date(date).toJSON().split('T')[0]
}

function compareDateDesc(a: Post, b: Post): number {
  return a.frontMatter.date < b.frontMatter.date ? 1 : -1
}

export async function getPosts(): Promise<Post[]> {
  const paths = await getPostMDFilePaths()

  const posts = await Promise.all(
    paths.map(async (filePath): Promise<Post> => {
      const content = await readFile(filePath, 'utf-8')
      const { data } = matter(content)
      data.date = formatDate(data.date)

      return {
        frontMatter: data as PostFrontMatter,
        regularPath: `/${filePath.replace('.md', '.html')}`,
      }
    }),
  )

  posts.sort(compareDateDesc)
  return posts
}

// ============ Notes Module ============

export interface NoteItem {
  title: string
  path: string
}

export interface NoteCategory {
  name: string
  items: NoteItem[]
}

export async function getNotesSidebar(): Promise<NoteCategory[]> {
  const paths = await fg(['notes/**/*.md'], {
    ignore: ['node_modules', 'notes/README.md'],
  })

  // Group by directory
  const categoryMap = new Map<string, NoteItem[]>()

  for (const filePath of paths) {
    const content = await readFile(filePath, 'utf-8')
    const { data } = matter(content)
    // e.g. "notes/02-Ethereum/01-公钥与私钥.md" → dir = "02-Ethereum"
    const parts = filePath.split('/')
    const dir = parts[1] ?? ''
    const title = data.title || parts[parts.length - 1].replace('.md', '')

    if (!categoryMap.has(dir)) {
      categoryMap.set(dir, [])
    }
    categoryMap.get(dir)!.push({
      title,
      path: `/${filePath.replace('.md', '.html')}`,
    })
  }

  // Sort categories by dir name, sort items within each category
  const categories: NoteCategory[] = []
  const sortedDirs = [...categoryMap.keys()].sort()

  for (const dir of sortedDirs) {
    const items = categoryMap.get(dir)!
    items.sort((a, b) => a.path.localeCompare(b.path))
    // Clean up dir name: "02-Ethereum" → "Ethereum"
    const name = dir.replace(/^\d+-/, '')
    categories.push({ name, items })
  }

  return categories
}
