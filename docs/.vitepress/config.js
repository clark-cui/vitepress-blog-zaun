// @ts-check

const Blog = [{
    text: 'Why Blog',
    link: '/blog/why',
  },
  {
    text: 'First Blog',
    link: '/blog/first',
  },
]



const Note = [{
    text: 'Why Note',
    link: '/note/why',
  },
  {
    text: 'First Note',
    link: '/note/first',
  },
]



const slidebars = [{
    text: 'Blog',
    children: Blog,
  },
  {
    text: 'Note',
    children: Note,
  }
]

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'Clark Cui',
  description: 'Home of Clark Cui',
  head: [
    ['link', {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }],
    ['meta', {
      name: 'author',
      content: 'Clark Cui'
    }],
    ['meta', {
      property: 'og:title',
      content: 'Home'
    }],
    ['meta', {
      property: 'og:image',
      content: 'https://sli.dev/og-image.png'
    }],
    ['meta', {
      property: 'og:description',
      content: 'Home of Clark Cui'
    }],
    ['meta', {
      name: 'twitter:card',
      content: 'summary_large_image'
    }],
    ['meta', {
      name: 'twitter:creator',
      content: '@slidevjs'
    }],
    ['meta', {
      name: 'twitter:image',
      content: 'https://sli.dev/og-image.png'
    }],
    ['link', {
      rel: 'dns-prefetch',
      href: 'https://fonts.gstatic.com'
    }],
    ['link', {
      rel: 'preconnect',
      crossorigin: 'anonymous',
      href: 'https://fonts.gstatic.com'
    }],
    ['link', {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;500&family=Inter:wght@200;400;500;600',
      rel: 'stylesheet'
    }],
  ],
  themeConfig: {
    repo: 'clark-cui/homeSite',
    logo: '/logo.svg',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: 'https://github.com/clark-cui/homeSite/issues',
    editLinkText: 'Edit this page in Github',

    // algolia: {
    //   apiKey: '90a0bae6ff7307fb76896cbe2f975b0c',
    //   indexName: 'clark-cui-docs',
    // },

    nav: [{
        text: 'Blog',
        items: Blog,
      },
      {
        text: 'Note',
        items: Note,
      },
    ],

    sidebar: {
      '/blog/': slidebars,
      '/note/': slidebars,
      '/': slidebars,
    },
  },
}