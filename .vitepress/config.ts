/*
 * @Author: nanfangzhe nanfangzhe@qq.com
 * @Date: 2023-03-03 20:19:21
 * @LastEditors: nanfangzhe nanfangzhe@qq.com
 * @LastEditTime: 2023-03-03 23:49:16
 * @FilePath: \tea-blog.github.io\.vitepress\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getPosts, getPostLength } from "./theme/serverUtils";
import { buildBlogRSS } from "./theme/rss";

async function config() {
  return {
    lang: "zh-CN",
    title: "茶博客",
    description: "Home of Tea Blog",
    head: [
      [
        "link",
        {
          rel: "icon",
          type: "image/svg",
          href: "/horse.svg",
        },
      ],
      [
        "meta",
        {
          name: "author",
          content: "Tea Blog",
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
          content: "Home of Tea Blog",
        },
      ],
    ],
    // cleanUrls: "with-subfolders",
    lastUpdated: false,
    themeConfig: {
      // repo: "clark-cui/homeSite",
      logo: "/horse.svg",
      docsDir: "/",
      // docsBranch: "master",
      posts: await getPosts(),
      pageSize: 5,
      postLength: await getPostLength(),
      nav: [
        {
          text: "🏡我的首页",
          link: "/",
        },
        {
          text: "🔖我的标签",
          link: "/tags",
        },
        {
          text: "📃时间分类",
          link: "/archives",
        },
        // {
        //   text: "🔥RSS",
        //   link: "https://clark-cui.top/feed.xml",
        // },
      ],
      socialLinks: [
        { icon: "github", link: "https://github.com/tea-blog/tea-blog.github.io" },
        // { icon: "twitter", link: "https://twitter.com/qingshuihe1" },
        // {
        //   icon: {
        //     svg: `<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20">
        //     <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l266.090667 225.6a149.333333 149.333333 0 0 0 193.152 0L874.666667 375.189333zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z" ></path>
        //     </svg>`,
        //   },
        //   link: "mailto:rongchuancui@gmail.com",
        // },
      ],
    },
    buildEnd: buildBlogRSS,

  };
}
export default config();
