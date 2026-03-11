import type { Post } from './serverUtils'

export type TagMap = Record<string, Post[]>

export function initTags(posts: Post[]): TagMap {
  const tagMap: TagMap = {}

  for (const post of posts) {
    const { tags } = post.frontMatter
    if (!Array.isArray(tags)) continue

    for (const tag of tags) {
      if (!tagMap[tag]) {
        tagMap[tag] = []
      }
      tagMap[tag].push(post)
    }
  }

  return tagMap
}

export function useYearSort(posts: Post[]): Post[][] {
  const yearGroups: Post[][] = []
  let currentYear = ''

  for (const post of posts) {
    const date = post.frontMatter.date
    if (!date) continue

    const year = date.split('-')[0]

    if (year !== currentYear) {
      yearGroups.push([])
      currentYear = year
    }

    yearGroups[yearGroups.length - 1].push(post)
  }

  return yearGroups
}

export interface HeaderItem {
  title: string
  link: string
  level: number
}

export function getHeaders(): HeaderItem[] {
  // Query headings within .vp-doc (blog posts and notes after class is applied).
  // Fall back to .VPPage to handle the timing race where NotesOutline mounts
  // before NotesLayout's applyVpDocClass() has run.
  const container = document.querySelector('.vp-doc') ?? document.querySelector('.VPPage')
  if (!container) return []

  return [...container.querySelectorAll(':is(h2, h3, h4, h5, h6)')]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => ({
      title: serializeHeader(el),
      link: `#${el.id}`,
      level: Number(el.tagName[1]),
    }))
}

function serializeHeader(el: Element): string {
  let result = ''

  for (const node of el.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      if (
        element.classList.contains('VPBadge') ||
        element.classList.contains('header-anchor')
      ) {
        continue
      }
      result += node.textContent
    } else if (node.nodeType === Node.TEXT_NODE) {
      result += node.textContent
    }
  }

  return result.trim()
}
