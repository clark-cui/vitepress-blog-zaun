import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import mathjax3 from 'markdown-it-mathjax3'
import { getPosts, getPostLength } from './theme/serverUtils'
import { buildBlogRSS } from './theme/rss'

const EMAIL_ICON_SVG = `<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20">
  <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l266.090667 225.6a149.333333 149.333333 0 0 0 193.152 0L874.666667 375.189333zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z" />
</svg>`

export default async () => {
  const [posts, postLength] = await Promise.all([
    getPosts(),
    getPostLength(),
  ])

  return defineConfig({
    lang: 'en-US',
    title: 'Clark Cui',
    description: 'Home of Clark Cui',
    head: [
      ['link', { rel: 'icon', type: 'image/svg', href: '/horse.svg' }],
      ['meta', { name: 'author', content: 'Clark Cui' }],
      ['meta', { property: 'og:title', content: 'Home' }],
      ['meta', { property: 'og:description', content: 'Home of Clark Cui' }],
    ],
    lastUpdated: false,
    themeConfig: {
      logo: '/horse.svg',
      avator: '/avator.png',
      search: { provider: 'local' },
      docsDir: '/',
      posts,
      pageSize: 5,
      postLength,
      nav: [
        { text: '🏡Blogs', link: '/' },
        { text: '🔖Tags', link: '/tags' },
        { text: '📃Archives', link: '/archives' },
        { text: '🔥RSS', link: 'https://clark-cui.top/feed.xml' },
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/clark-cui' },
        { icon: 'twitter', link: 'https://twitter.com/qingshuihe1' },
        { icon: { svg: EMAIL_ICON_SVG }, link: 'mailto:rongchuancui@gmail.com' },
      ],
      aside: false,
      showFireworksAnimation: false,
    },
    buildEnd: buildBlogRSS,
    markdown: {
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      codeTransformers: [transformerTwoslash()],
      config: (md) => {
        md.use(mathjax3)
      },
    },
  })
}
