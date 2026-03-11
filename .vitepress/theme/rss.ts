import { dirname } from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import fg from 'fast-glob'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { FeedOptions, Item } from 'feed'
import { Feed } from 'feed'

const DOMAIN = 'https://clarkcui.men'

const AUTHOR = {
  name: 'Clark Cui',
  email: 'rongchuancui@gmail.com',
  link: DOMAIN,
} as const

const FEED_OPTIONS: FeedOptions = {
  title: 'Clark Cui',
  description: "Clark Cui's Blog",
  id: `${DOMAIN}/`,
  link: `${DOMAIN}/`,
  copyright: 'MIT License',
  feedLinks: {
    json: `${DOMAIN}/feed.json`,
    atom: `${DOMAIN}/feed.atom`,
    rss: `${DOMAIN}/feed.xml`,
  },
  author: AUTHOR,
  image: `${DOMAIN}/horse.svg`,
  favicon: `${DOMAIN}/horse.svg`,
}

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function generateRSSItems(): Promise<Item[]> {
  const files = await fg('posts/*.md')

  const posts = await Promise.all(
    files
      .filter((file) => !file.includes('index'))
      .map(async (file) => {
        const raw = await readFile(file, 'utf-8')
        const { data, content } = matter(raw)
        const html = md.render(content).replace('src="/', `src="${DOMAIN}/`)

        return {
          ...data,
          date: new Date(data.date),
          content: html,
          author: [AUTHOR],
          link: `${DOMAIN}/${file.replace('.md', '.html')}`,
        } as Item
      }),
  )

  return posts.sort((a, b) => +b.date! - +a.date!)
}

async function writeFeed(name: string, items: Item[]): Promise<void> {
  const feed = new Feed(FEED_OPTIONS)
  items.forEach((item) => feed.addItem(item))

  const distDir = `./.vitepress/dist`
  await mkdir(dirname(`${distDir}/${name}`), { recursive: true })

  await Promise.all([
    writeFile(`${distDir}/${name}.xml`, feed.rss2(), 'utf-8'),
    writeFile(`${distDir}/${name}.atom`, feed.atom1(), 'utf-8'),
    writeFile(`${distDir}/${name}.json`, feed.json1(), 'utf-8'),
  ])
}

export async function buildBlogRSS(): Promise<void> {
  const items = await generateRSSItems()
  await writeFeed('feed', items)
}
