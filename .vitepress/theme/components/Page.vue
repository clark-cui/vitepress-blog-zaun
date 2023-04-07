<template>
  <div class="pyro">
    <div class="before"></div>
    <div class="after"></div>
  </div>
  <ShareCard />
  <h1 class="blog-title">Blogs</h1>
  <div class="blogList">
    <a class="blog" v-for="item in posts" :href="withBase(item.regularPath)">
      <div class="title">{{ item.frontMatter.title }}</div>
      <div class="date">{{ transDate(item.frontMatter.date) }}</div>
    </a>
  </div>
  <div class="pagination">
    <button class="left" v-if="pageCurrent > 1" @click="go(pageCurrent - 1)">
      Previous page
    </button>
    <div v-if="pagesNum > 1">{{ `${pageCurrent}/${pagesNum}` }}</div>
    <button
      class="right"
      v-if="pageCurrent < pagesNum"
      @click="go(pageCurrent + 1)"
    >
      Next page
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ShareCard from "./ShareCard.vue";
import { useData, withBase } from "vitepress";
interface post {
  regularPath: string;
  frontMatter: object;
}
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
    case "01":
      month = `Jan`;
      break;
    case "2":
    case "02":
      month = `Feb`;
      break;
    case "3":
    case "03":
      month = `Mar`;
      break;
    case "4":
    case "04":
      month = `Apr`;
      break;
    case "5":
    case "05":
      month = `May`;
      break;
    case "6":
    case "06":
      month = `Jun`;
      break;
    case "7":
    case "07":
      month = `Jul`;
      break;
    case "8":
    case "08":
      month = `Aug`;
      break;
    case "9":
    case "09":
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
</script>

<style scoped>
.blog-title {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 24px;
}
.blogList {
  padding: 30px 0;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.blog {
  width: 85%;
  display: block;
  border-radius: 10px;
  padding: 0 20px;
  margin: 10px;
  background: var(--vp-c-bg);
  max-width: 600px;
  box-shadow: 6px 6px var(--vp-c-brand);
  border: 4px solid #3f4e4f;
  cursor: pointer;
}
.blog:hover {
  text-decoration: none;
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px var(--vp-c-brand);
}
.title {
  color: var(--vp-c-brand-light);
  font-size: 1.2em;
  font-weight: bold;
}
.date {
  padding-bottom: 7px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}

button::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--vp-c-color-d);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.left {
  position: absolute;
  left: 0;
}
.right {
  position: absolute;
  right: 0;
}

.pyro {
  box-sizing: border-box;
}
.pyro > .before,
.pyro > .after {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
  animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro > .after {
  animation-delay: 1.25s, 1.25s, 1.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
}

@keyframes bang {
  to {
    box-shadow: 161px -30.33333px #00ffdd, -157px -164.33333px #ff7300,
      -201px 27.66667px #0040ff, 221px -184.33333px #ff00e1,
      72px 26.66667px blue, 8px -82.33333px #ff0062, 140px -252.33333px #ffaa00,
      -14px 6.66667px #7b00ff, -162px 45.66667px #ff0900,
      -211px -33.33333px #ff7b00, 81px -109.33333px #0037ff,
      82px -308.33333px #ff9100, 235px -94.33333px #00a2ff,
      -149px -58.33333px #e600ff, 138px -260.33333px #0044ff,
      -93px -290.33333px #3cff00, -234px -82.33333px #ff1e00,
      -16px 15.66667px #cc00ff, 214px -298.33333px #00eaff,
      -192px -18.33333px #00ccff, 20px -227.33333px #ff00ae,
      6px -30.33333px #ff0048, 175px 13.66667px #ffe100,
      -185px -285.33333px #0dff00, 242px -269.33333px #ff0055,
      86px -1.33333px #5100ff, 228px -314.33333px #00ff80,
      229px -48.33333px #00ff4d, -55px -266.33333px #ff001e,
      68px -252.33333px #3c00ff, -134px -215.33333px #00ff11,
      37px -160.33333px #00ffe1, -223px -265.33333px #ff0033,
      184px -123.33333px #ffd000, -18px -46.33333px #009dff,
      228px -220.33333px #00ffb3, 67px -75.33333px #d900ff,
      130px 52.66667px #ffc800, -56px -97.33333px #b7ff00,
      -89px -139.33333px #00ffcc, -174px -79.33333px #3cff00,
      -141px -254.33333px #ff0048, 98px -110.33333px #0026ff,
      -66px -293.33333px #ffc400, 156px -258.33333px #001aff,
      138px -170.33333px #00ffd9, -228px -171.33333px #00ff11,
      163px -274.33333px #ffea00, 150px -112.33333px #0033ff,
      -55px 32.66667px #0048ff, -36px 65.66667px #b7ff00,
      118px -160.33333px #00ff6a, 29px -28.33333px #9900ff,
      137px 1.66667px #002fff, 242px -164.33333px #ff0059,
      -158px 9.66667px #ff00cc, -62px -231.33333px #00ff11,
      -64px -111.33333px #c8ff00, -207px 43.66667px #51ff00,
      -69px 8.66667px #ff00ae, -83px -9.33333px #6600ff;
  }
}

@keyframes gravity {
  to {
    transform: translateY(200px);
    opacity: 0;
  }
}

@keyframes position {
  0%,
  19.9% {
    margin-top: -10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 20%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 10%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 20%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 20%;
    margin-left: 80%;
  }
}
</style>
