// @ts-check

export default {
  // lang: 'en-US',
  title: "Clark Cui",
  description: "Home of Clark Cui",
  head: [
    [
      "link",
      {
        rel: "icon",
        // type: 'image/png',
        type: "image/jpeg",
        href: "/avator.jpg",
      },
    ],
    [
      "meta",
      {
        name: "author",
        content: "Clark Cui",
      },
    ],
    [
      "meta",
      {
        property: "og:title",
        content: "Home",
      },
    ],
    // ['meta', {
    //   property: 'og:image',
    //   content: 'https://sli.dev/og-image.png'
    // }],
    [
      "meta",
      {
        property: "og:description",
        content: "Home of Clark Cui",
      },
    ],
    // ['meta', {
    //   name: 'twitter:card',
    //   content: 'summary_large_image'
    // }],
    // ['meta', {
    //   name: 'twitter:creator',
    //   content: '@qingshuihe1'
    // }],
    // ['meta', {
    //   name: 'twitter:image',
    //   content: 'https://sli.dev/og-image.png'
    // }],
    // ['link', {
    //   rel: 'dns-prefetch',
    //   href: 'https://fonts.gstatic.com'
    // }],
    // ['link', {
    //   rel: 'preconnect',
    //   crossorigin: 'anonymous',
    //   href: 'https://fonts.gstatic.com'
    // }],
    // ['link', {
    //   href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;400;500&family=Inter:wght@200;400;500;600',
    //   rel: 'stylesheet'
    // }],
  ],
  themeConfig: {
    repo: "clark-cui/homeSite",
    logo: "/tea.svg",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: "https://github.com/clark-cui/homeSite/issues",
    editLinkText: "Edit this page in Github",
    lastUpdated: "Last Updated",
    algolia: {
      apiKey: "90a0bae6ff7307fb76896cbe2f975b0c",
      indexName: "clark-cui-docs",
    },

    nav: [
      { text: "blog", link: "/blog/why" },
      {
        text: "note",
        items: getNoteNav(),
      },
    ],

    sidebar: {
      "/blog/": false,
      "/note/unsettle": getUsSidebar(),
      "note/typescript": getTsSidebar(),
      "/": false,
    },
  },
};
function getUsSidebar() {
  return [
    {
      text: "Unsettled",
      children: [
        { text: "why", link: "/note/unsettle/why" },
        { text: "first", link: "/note/unsettle/first" },
      ],
    },
  ];
}
function getTsSidebar() {
  return [
    {
      text: "TypeScript",
      children: [{ text: "tsconfig", link: "/note/typescript/tsconfig" }],
    },
  ];
}
function getNoteNav() {
  return [
    {
      text: "Unsettled",
      link: "/note/unsettle/why",
    },
    {
      text: "TypeScript",
      link: "/note/typescript/tsconfig",
    },
  ];
}
