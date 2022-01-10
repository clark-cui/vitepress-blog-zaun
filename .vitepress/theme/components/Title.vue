<template>
  <h1 class="title">{{ title }}</h1>
  <div class="date">🕒 lastUpdated: {{ date }}</div>
  <!-- <div class="description">{{ description }}</div> -->
</template>
<script lang="ts" setup>
import { useData } from "vitepress";
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
const pageData: pageData = useData().page.value;
const { title, description, lastUpdated } = pageData;
// /https://day.js.org/docs/zh-CN/plugin/relative-time
dayjs.extend(relativeTime);
const date = dayjs().to(dayjs(lastUpdated));
</script>
<style scoped>
.title {
  color: #37463c;
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

