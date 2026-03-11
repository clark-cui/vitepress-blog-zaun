<template>
  <FireWorksAnimation />
  <ShareCard />
  <h1 class="blog-title">Blogs</h1>
  <div class="blog-list">
    <a
      v-for="item in currentPagePosts"
      :key="item.regularPath"
      class="blog"
      :href="withBase(item.regularPath)"
    >
      <div class="title">{{ item.frontMatter.title }}</div>
      <div class="date">{{ formatDate(item.frontMatter.date) }}</div>
    </a>
  </div>
  <div v-if="totalPages > 1" class="pagination">
    <button v-if="currentPage > 1" class="left" @click="goToPage(currentPage - 1)">
      Previous page
    </button>
    <div>{{ `${currentPage}/${totalPages}` }}</div>
    <button v-if="currentPage < totalPages" class="right" @click="goToPage(currentPage + 1)">
      Next page
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import ShareCard from './ShareCard.vue'
import FireWorksAnimation from './FireWorksAnimation.vue'
import type { Post } from '../serverUtils'

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

const { theme } = useData()

const allPosts = computed<Post[]>(() => {
  const posts: Post[] = theme.value.posts ?? []
  return posts.filter((item) => !item.regularPath.includes('index'))
})

const pageSize = computed<number>(() => theme.value.pageSize ?? 5)
const totalPages = computed(() => Math.ceil(allPosts.value.length / pageSize.value))

const currentPage = ref(1)

const currentPagePosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return allPosts.value.slice(start, start + pageSize.value)
})

function goToPage(page: number): void {
  currentPage.value = page
}

function formatDate(date: string): string {
  const [year, month, day] = date.split('-')
  const monthIndex = Number.parseInt(month, 10) - 1
  const monthName = MONTH_NAMES[monthIndex] ?? 'Month'
  return `${monthName} ${day}, ${year}`
}
</script>

<style scoped>
.blog-title {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 24px;
}
.blog-list {
  padding: 30px 0;
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
</style>
