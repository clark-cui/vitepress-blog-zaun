import { getPosts, getPostLength } from "./theme/serverUtils";
import highlightjs from "markdown-it-highlightjs";

async function config() {
  return {
    lang: "en-US",
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
      // repo: "clark-cui/homeSite",
      logo: "/tea.svg",
      docsDir: "/",
      // docsBranch: "master",
      lastUpdated: false,
      posts: await getPosts(),
      pageSize: 5,
      postLength: await getPostLength(),
      nav: [
        {
          text: "🏡Home",
          link: "/",
        },
        {
          text: "🔖Tags",
          link: "/tags",
        },
        {
          text: "📃Archives",
          link: "/archives",
        },
      ],
      markdown: {
        config: (md) => {
          md.use(highlightjs);
        },
      },
    },
  };
}
export default config();
