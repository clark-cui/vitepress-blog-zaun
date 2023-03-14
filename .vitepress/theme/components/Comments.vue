<template>
  <div id="gitalk-container"></div>
</template>
<script lang="ts" setup>
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import { onMounted } from "vue";
// import { useData } from "vitepress";
// const relativePath = useData().page.value.relativePath;

onMounted(() => {
  const gitalk = new Gitalk({
    clientID: "a8430bf8a0464113ee24",
    clientSecret: "df4cbf03c4ceca8a39076e6b7a0fb878e55534e2",
    repo: "blog-comments",
    owner: "clark-cui",
    admin: ["clark-cui"],
    id: location.pathname.substring(0, 50), // Ensure uniqueness and length less than 50
    language: "zh-CN",
    distractionFreeMode: true, // Facebook-like distraction free mode
  });
  gitalk.render("gitalk-container");
});
</script>
<style scoped></style>
