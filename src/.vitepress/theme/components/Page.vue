<template>
  <div class="blogList">
    <div class="blog" v-for="item in posts" @click="go(item)">
      <div class="title">{{ item.frontMatter.title }}</div>
      <div class="date">{{ transDate(item.frontMatter.date) }}</div>
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
let posts = (theme as any)._value.posts || [];
// filter index post
posts = posts.filter((item: post) => {
  return item.regularPath.indexOf("index") < 0;
});
// add go function
const go = (item: post) => {
  let url = item.regularPath;
  url = url.replace("/src", "");
  location.href = url;
};
// timestamp transform
const transDate = (date: string) => {
  const dateArray = date.split("-");
  console.log(dateArray);
  let year = dateArray[0],
    month = ``,
    day = dateArray[2];
  switch (dateArray[1]) {
    case "1":
      month = `Jan`;
      break;
    case "2":
      month = `Feb`;
      break;
    case "3":
      month = `Mar`;
      break;
    case "4":
      month = `Apr`;
      break;
    case "5":
      month = `May`;
      break;
    case "6":
      month = `Jun`;
      break;
    case "7":
      month = `Jul`;
      break;
    case "8":
      month = `Aug`;
      break;
    case "9":
      month = `Sep`;
      break;
    case "10":
      month = `Oct`;
      break;
    case "11":
      month = `Nov`;
      break;
    case "12":
      month = `Dec`;
      break;
    default:
      month = `Month`;
  }
  return `${month} ${day}, ${year}`;
};
// hide last updated
onMounted(() => {
  let updatedDom: unknown = document.getElementsByClassName("page-footer")[0];
  (updatedDom as any).style.display = "none";
});
</script>
<style scoped>
.blogList {
  padding: 30px 0;
}
.blog {
  display: block;
  border-radius: 10px;
  padding: 0 20px;
  margin: 10px;
  background: #fff;
  max-width: 600px;

  box-shadow: 6px 6px #646cff;
  border: 4px solid #282936;
  cursor: pointer;
}
.title {
  color: #747bff;
  font-size: 30px;
  font-weight: bold;
}
.date {
  padding-bottom: 7px;
}
</style>
