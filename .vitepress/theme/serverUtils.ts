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

export async function getPostLength(): Promise<number> {
  const paths = await getPostMDFilePaths()
  return paths.length
}
