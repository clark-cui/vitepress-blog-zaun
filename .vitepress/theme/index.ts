import Theme from "vitepress/theme";
import Archives from "./components/Archives.vue";
import Tags from "./components/Tags.vue";
import MyLayout from "./components/MyLayout.vue";
import TwoSlashFloatingVue from "vitepress-plugin-twoslash/client";
import "vitepress-plugin-twoslash/style.css";

import "./custom.css";

export default {
  extends: Theme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // register global components
    app.component("Archives", Archives);
    app.component("Tags", Tags);
    app.use(TwoSlashFloatingVue);
  },
};
