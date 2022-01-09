// @ts-check
const {
  getPosts,
} = require("./theme/utils");

async function config() {
  return {
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
      [
        "meta",
        {
          property: "og:description",
          content: "Home of Clark Cui",
        },
      ],
    ],
    themeConfig: {
      repo: "clark-cui/homeSite",
      logo: "/tea.svg",
      docsDir: "/",
      docsBranch: "master",
      editLinks: "https://github.com/clark-cui/homeSite/issues",
      editLinkText: "Edit this page in Github",
      lastUpdated: "Last Updated",
      posts: await getPosts(),
      //       algolia: {
      //         apiKey: "90a0bae6ff7307fb76896cbe2f975b0c",
      //         indexName: "clark-cui-docs",
      //       },

      nav: [{
        text: "Posts",
        link: "./posts/"
      }, ],

      sidebar: {
        "./posts/": false,
        "/": false,
      },
    },
  }

};
module.exports = config();