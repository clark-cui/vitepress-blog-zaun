<template>
  <div v-if="headers.length > 0" class="category">
    <ul class="list">
      <li v-for="item in headers" :key="item.link" class="header">
        <a v-if="item.level === 2" :href="item.link" class="header-h2">
          {{ item.title }}
        </a>
        <ul v-if="item.level === 3">
          <li class="header">
            <a :href="item.link" :class="['header-h3', { 'show-indent': showIndent }]">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, ref } from 'vue'
import { onContentUpdated } from 'vitepress'
import { getHeaders } from '../utils'
import type { HeaderItem } from '../utils'

const headers = shallowRef<HeaderItem[]>([])
const showIndent = ref(false)

onContentUpdated(() => {
  headers.value = getHeaders()
  showIndent.value = headers.value.some((header: HeaderItem) => header.level === 2)
})
</script>

<style scoped>
.category {
  width: 20rem;
  background: var(--vp-c-bg);
  box-shadow: 6px 6px var(--vp-c-brand);
  border: 4px solid #3f4e4f;
  color: var(--vp-c-brand-light);
  overflow-y: auto;
  max-height: 300px;
}
.list {
  padding-left: 1.25em;
  margin: 1rem 0;
  line-height: 1.7;
  list-style-type: none;
  box-sizing: border-box;
}

.show-indent {
  padding-left: 1rem;
}
ul {
  list-style-type: none;
}
.header {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (min-width: 768px) {
  .category {
    max-height: 400px;
  }
}
@media (min-width: 1024px) {
  .category {
    max-height: 450px;
  }
}
@media (min-width: 1400px) {
  .category {
    position: fixed;
    right: 20px;
    max-height: 490px;
  }
}
</style>
