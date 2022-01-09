<template>
  <div class="blogList">
    <a class="blog" v-for="item in posts" :href="withBase(item.regularPath)">
      <div class="title">{{ item.frontMatter.title }}</div>
      <div class="date">{{ transDate(item.frontMatter.date) }}</div>
    </a>
  </div>
  <div class="pagination">
    <a
      class="link"
      :class="{ active: pageCurrent === i }"
      v-for="i in pagesNum"
      :key="i"
      @click="go(i)"
      >{{ i }}</a
    >
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
let pageCurrent = 0;
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
  if (allMap[index].length > 1) {
    index += 1;
  }
  allMap[index].push(postsAll[i]);
}
console.log(allMap, "allMap");
let posts = ref([]);
posts.value = allMap[pageCurrent];

const go = (i) => {
  pageCurrent = i;
  posts.value = allMap[pageCurrent - 1];
};
// timestamp transform
const transDate = (date: string) => {
  const dateArray = date.split("-");
  // console.log(dateArray);
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
.list {
  border-bottom: 1px dashed var(--c-divider-light);
  padding: 1rem 0 0 0;
}
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list-li {
  font-size: 1.0625rem;
  font-weight: 500;
  margin: 0.1rem 0;
}

.describe {
  font-size: 0.9375rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #71717a;
  margin: 0.625rem 0 1rem;
  line-height: 1.5rem;
}
.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
.link {
  display: inline-block;
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  border: 1px var(--c-divider-light) solid;
  border-right: none;
}
.link.active {
  background: var(--c-brand);
  color: #fff;
  border: 1px solid var(--c-brand) !important;
}
.link:first-child {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.link:last-child {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  border-right: 1px var(--c-divider-light) solid;
}

@media screen and (max-width: 720px) {
  .list {
    padding: 1rem 0 0 0;
  }
  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-li {
    font-size: 1.125rem;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 17rem;
  }
  .describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin: 0.5rem 0 1rem;
  }
  .date {
    font-size: 0.8125rem;
  }
}
</style>
