<!--
 * @Author: nanfangzhe nanfangzhe@qq.com
 * @Date: 2023-03-03 20:19:21
 * @LastEditors: nanfangzhe nanfangzhe@qq.com
 * @LastEditTime: 2023-03-03 23:17:27
 * @FilePath: \tea-blog.github.io\.vitepress\theme\components\Comments.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
  clientID: "c4894cdcbf39d7dbcfb5",
  clientSecret: "90473f3323b7225c9420d3572ca521bb666c65ed",
  repo: "tea-blog.github.io",
  owner: "tea-blog",
  admin: ["tea-blog"],
  id: location.pathname.substring(0, 50), // Ensure uniqueness and length less than 50
  language: "zh-CN",
  distractionFreeMode: true, // Facebook-like distraction free mode
});

onMounted(() => {
  gitalk.render("gitalk-container");
});
</script>
<style scoped></style>
