<template>
  <div class="blogList">
    <div class="blog" v-for="item in posts" @click="go(item)">
      <span>{{ item.frontMatter.title }}</span>
      <span>{{ item.frontMatter.date }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface post {
  regularPath: string;
  frontMatter: object;
}
import { onMounted } from "vue";
import { useData } from "vitepress";
const { theme } = useData();

// get posts
let posts = theme._value.posts || [];
// filter index post
posts = posts.filter((item: post) => {
  return item.regularPath.indexOf("index") < 0;
});
// add go function
const go = (item: post) => {
  let url = item.regularPath;
  url = url.replace("/docs", "");
  location.href = url;
};
onMounted(() => {
  // storage lottie
  // created insertNode and add style
});
</script>
<style scoped>
.pic {
  text-align: center;
}
</style>
