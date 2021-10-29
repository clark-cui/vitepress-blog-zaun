// @ts-check

export default {
  // lang: 'en-US',
  title: "Clark Cui",
  description: "Home of Clark Cui",

  themeConfig: {
    repo: "clark-cui/homeSite",
    logo: "/tea.svg",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: "https://github.com/clark-cui/homeSite/issues",
    editLinkText: "Edit this page in Github",
    lastUpdated: "Last Updated",

    // algolia: {
    //   apiKey: '90a0bae6ff7307fb76896cbe2f975b0c',
    //   indexName: 'clark-cui-docs',
    // },

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
