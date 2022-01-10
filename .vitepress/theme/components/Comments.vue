<template>
  <div id="gitalk-container"></div>
</template>
<script lang="ts" setup>
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import { onMounted } from "vue";
// import { useData } from "vitepress";
// const relativePath = useData().page.value.relativePath;

const gitalk = new Gitalk({
  clientID: "94f8f287e970c48e2122",
  clientSecret: "2a3c7be462ddf835cff98c4ffa7add4ba229ad7e",
  repo: "blog-comments",
  owner: "clark-cui",
  admin: ["clark-cui"],
  id: decodeURI(window.location.pathname), // Ensure uniqueness and length less than 50
  language: "zh-CN",
  distractionFreeMode: true, // Facebook-like distraction free mode
});
onMounted(() => {
  gitalk.render("gitalk-container");
});
</script>
<style scoped>
</style>

