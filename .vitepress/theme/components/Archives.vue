<template>
  <div class="main">
    <div v-for="(yearList, idx) in yearGroups" :key="idx" class="year-item">
      <div class="year">
        {{ yearList[0].frontMatter.date.split('-')[0] }}
      </div>
      <a
        v-for="article in yearList"
        :key="article.regularPath"
        :href="withBase(article.regularPath)"
        class="article"
      >
        <div class="title">
          <div class="title-o"></div>
          {{ article.frontMatter.title }}
        </div>
        <div class="date">{{ article.frontMatter.date.slice(5) }}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useYearSort } from '../utils'

const { theme } = useData()
const yearGroups = computed(() => useYearSort(theme.value.posts))
</script>

<style scoped>
.main {
  margin: 0 auto;
  padding: 0.5rem 1.5rem 4rem;
  max-width: 48rem;
}
.year-item {
  border-bottom: 1px dashed #c7c7c7;
}
.year-item:last-child {
  border: none;
}
.year {
  padding: 16px 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.article {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px;
  color: var(--vp-c-text-2);
  transition: border 0.3s ease, color 0.3s ease;
}
.article:hover {
  text-decoration: none;
  color: var(--vp-c-brand);
}
.date {
  font-family: Georgia, sans-serif;
}
</style>
