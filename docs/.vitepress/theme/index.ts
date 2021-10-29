import DefaultTheme from "vitepress/theme";
import Home from "./components/Home.vue";
// import Docs from "./components/Docs.vue";
// import Tags from "./components/Tags.vue";
import "./custom.css";
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // register global components
    app.component("Home", Home);
    // app.component("Docs", Docs);
    // app.component("Tags", Tags);

    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },
};
