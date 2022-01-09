import DefaultTheme from "vitepress/theme";
// import Docs from "./components/Docs.vue";
// import Tags from "./components/Tags.vue";
import MyLayout from "./components/MyLayout.vue";
import Page from "./components/Page.vue";
import "./custom.css";
export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // register global components
    // app.component("Docs", Docs);
    // app.component("Tags", Tags);
    app.component("Page", Page);
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },
};
