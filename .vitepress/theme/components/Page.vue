<template>
  <div class="blogList">
    <a class="blog" v-for="item in posts" :href="withBase(item.regularPath)">
      <div class="title">{{ item.frontMatter.title }}</div>
      <div class="date">{{ transDate(item.frontMatter.date) }}</div>
    </a>
  </div>
  <div class="pagination">
    <div
      class="link"
      :class="{ activeLink: pageCurrent === i }"
      v-for="i in pagesNum"
      :key="i"
      @click="go(i)"
    >
      {{ i }}
    </div>
  </div>
</template>
<script lang="ts" setup>
interface post {
  regularPath: string;
  frontMatter: object;
}
import { onMounted, ref, reactive } from "vue";

import { useData, withBase } from "vitepress";
const { theme } = useData();

// get posts
let postsAll = theme.value.posts || [];
// get postLength
let postLength = theme.value.postLength;
// get pageSize
let pageSize = theme.value.pageSize;
//  pagesNum
let pagesNum =
  postLength % pageSize === 0
    ? postLength / pageSize
    : postLength / pageSize + 1;
pagesNum = parseInt(pagesNum.toString());
//pageCurrent
let pageCurrent = ref(1);
// filter index post
postsAll = postsAll.filter((item: post) => {
  return item.regularPath.indexOf("index") < 0;
});
// pagination
let allMap = {};
for (let i = 0; i < pagesNum; i++) {
  allMap[i] = [];
}
let index = 0;
for (let i = 0; i < postsAll.length; i++) {
  if (allMap[index].length > pageSize - 1) {
    index += 1;
  }
  allMap[index].push(postsAll[i]);
}
// set posts
let posts = ref([]);
posts.value = allMap[pageCurrent.value - 1];

// click pagination
const go = (i) => {
  pageCurrent.value = i;
  posts.value = allMap[pageCurrent.value - 1];
};
// timestamp transform
const transDate = (date: string) => {
  const dateArray = date.split("-");
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.blog {
  width: 100%;
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
.blog:hover {
  text-decoration: none;
}
.title {
  color: #747bff;
  font-size: 30px;
  font-weight: bold;
}
.date {
  padding-bottom: 7px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: right;
}
.link {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border: 1px solid #282936;
  cursor: pointer;
  border-right: none;
}
.link:last-child {
  border-right: 1px solid #282936;
}
.activeLink {
  background-color: #646cff;
  color: white;
}
</style>
