<template>
  <h1 class="title">{{ pageData.title }}</h1>
  <div class="date">🕒 Published at: {{ publishDate }}</div>
</template>
<script lang="ts" setup>
import { useData, onContentUpdated } from "vitepress";
import { ref, reactive } from "vue";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
type pageData = {
  description: string;
  title: string;
  frontmatter: object;
  headers: object[];
  lastUpdated: number;
  relativePath: string;
};
const pageData: pageData = useData().page;
const publishDate = ref("");
dayjs.extend(relativeTime);
onContentUpdated(() => {
  const { frontmatter } = pageData.value;
  publishDate.value = dayjs().to(dayjs(frontmatter.date || Date.now()));
});
</script>
<style scoped>
.title {
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 2.25em;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  line-height: 1.3;
  font-family: Dosis, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}
.date {
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px dashed #c7c7c7;
}
</style>
