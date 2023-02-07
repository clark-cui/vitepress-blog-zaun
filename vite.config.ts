//vite.config.ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    SearchPlugin({
      // https://github.com/nextapps-de/flexsearch#options
      preset: "default",
      previewLength: 62,
      buttonLabel: "Search",
      placeholder: "Search blogs",
    }),
  ],
});
