import DefaultTheme from "vitepress/theme";
import Archives from "./components/Archives.vue";
import Tags from "./components/Tags.vue";
import MyLayout from "./components/MyLayout.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // register global components
    app.component("Archives", Archives);
    app.component("Tags", Tags);
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },
};
